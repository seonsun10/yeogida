'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { readCategories, readServices } from '@/lib/admin-data';
import { writeCategories, writeServices } from '@/lib/admin-write';
import { ensureAdmin } from '@/lib/admin-auth';
import { getAllCategories } from '@/lib/services';
import { updateReportStatus } from '@/lib/reports';
import type { Service } from '@/types/service';

export type ActionState = { error?: string; message?: string } | undefined;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE_LABEL = '5MB';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

function validateImageFile(file: File): string | null {
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    return `지원하지 않는 이미지 형식입니다: ${file.name} (PNG, JPG, WEBP, GIF만 가능)`;
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `파일 용량이 너무 큽니다: ${file.name} (최대 ${MAX_IMAGE_SIZE_LABEL})`;
  }
  return null;
}

async function saveImageFile(
  slug: string,
  file: File,
  filePrefix: string,
): Promise<string> {
  const dir = path.join(UPLOADS_DIR, slug);
  await fs.mkdir(dir, { recursive: true });

  const ext = path.extname(file.name).toLowerCase();
  const fileName = `${filePrefix}${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, fileName), buffer);
  return `/uploads/${slug}/${fileName}`;
}

async function removeUploadedFile(imagePath: string): Promise<void> {
  await fs.unlink(path.join(process.cwd(), 'public', imagePath)).catch(() => {});
}

function parseListField(value: FormDataEntryValue | null): string[] {
  return String(value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function readField(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim();
}

function buildFieldsFromForm(
  formData: FormData,
): Omit<Service, 'id' | 'slug' | 'images' | 'thumbnail'> | { error: string } {
  const name = readField(formData, 'name');
  const summary = readField(formData, 'summary');
  const description = readField(formData, 'description');
  const categorySlug = readField(formData, 'categorySlug');
  const url = readField(formData, 'url');
  const hours = readField(formData, 'hours');
  const cost = readField(formData, 'cost');
  const source = readField(formData, 'source');
  const lastVerified = readField(formData, 'lastVerified');
  const affiliate = formData.get('affiliate') === 'on';
  const tags = parseListField(formData.get('tags'));
  const badges = parseListField(formData.get('badges'));

  if (!name || !summary || !description || !url || !hours || !source) {
    return { error: '필수 항목을 모두 입력해주세요.' };
  }
  if (cost !== 'free' && cost !== 'paid') {
    return { error: '비용 구분이 올바르지 않습니다.' };
  }
  if (!getAllCategories().some((category) => category.slug === categorySlug)) {
    return { error: '카테고리를 선택해주세요.' };
  }

  return {
    name,
    summary,
    description,
    categorySlug,
    tags,
    url,
    hours,
    cost,
    badges,
    source,
    affiliate,
    lastVerified: lastVerified || new Date().toISOString().slice(0, 10),
  };
}

export async function createService(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const slug = readField(formData, 'slug');
  if (!SLUG_PATTERN.test(slug)) {
    return {
      error: '슬러그는 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.',
    };
  }

  const fields = buildFieldsFromForm(formData);
  if ('error' in fields) return fields;

  const services = await readServices();
  if (services.some((service) => service.slug === slug)) {
    return { error: '이미 사용 중인 슬러그입니다.' };
  }

  const newService: Service = {
    id: slug,
    slug,
    images: [],
    thumbnail: '',
    ...fields,
  };

  services.push(newService);
  await writeServices(services);

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/category/${newService.categorySlug}`);
  redirect(`/admin/${slug}`);
}

export async function updateService(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const fields = buildFieldsFromForm(formData);
  if ('error' in fields) return fields;

  const services = await readServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) return { error: '서비스를 찾을 수 없습니다.' };

  Object.assign(service, fields);
  await writeServices(services);

  revalidatePath('/admin');
  revalidatePath(`/admin/${slug}`);
  revalidatePath('/');
  revalidatePath(`/service/${slug}`);
  revalidatePath(`/category/${service.categorySlug}`);
  return { message: '저장되었습니다.' };
}

export async function deleteService(slug: string): Promise<void> {
  ensureAdmin();

  const services = await readServices();
  const index = services.findIndex((item) => item.slug === slug);
  if (index === -1) return;

  const [removed] = services.splice(index, 1);
  await writeServices(services);
  await fs.rm(path.join(UPLOADS_DIR, slug), { recursive: true, force: true });

  revalidatePath('/admin');
  revalidatePath('/');
  revalidatePath(`/category/${removed.categorySlug}`);
  redirect('/admin');
}

export async function uploadServiceImages(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const files = formData
    .getAll('images')
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length === 0) {
    return { error: '업로드할 이미지를 선택해주세요.' };
  }

  for (const file of files) {
    const error = validateImageFile(file);
    if (error) return { error };
  }

  const services = await readServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) return { error: '서비스를 찾을 수 없습니다.' };

  for (const file of files) {
    const imagePath = await saveImageFile(slug, file, '');
    service.images.push(imagePath);
  }

  await writeServices(services);

  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/service/${slug}`);
  revalidatePath('/');
  return { message: '이미지가 업로드되었습니다.' };
}

export async function deleteServiceImage(
  slug: string,
  imagePath: string,
): Promise<void> {
  ensureAdmin();

  if (!imagePath.startsWith(`/uploads/${slug}/`) || imagePath.includes('..')) {
    return;
  }

  const services = await readServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) return;

  service.images = service.images.filter((image) => image !== imagePath);
  await writeServices(services);
  await removeUploadedFile(imagePath);

  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/service/${slug}`);
  revalidatePath('/');
}

export async function uploadServiceThumbnail(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const file = formData.get('thumbnail');
  if (!(file instanceof File) || file.size === 0) {
    return { error: '업로드할 썸네일 이미지를 선택해주세요.' };
  }

  const error = validateImageFile(file);
  if (error) return { error };

  const services = await readServices();
  const service = services.find((item) => item.slug === slug);
  if (!service) return { error: '서비스를 찾을 수 없습니다.' };

  const previousThumbnail = service.thumbnail;
  const thumbnailPath = await saveImageFile(slug, file, 'thumbnail-');
  service.thumbnail = thumbnailPath;
  await writeServices(services);

  if (previousThumbnail && previousThumbnail.startsWith(`/uploads/${slug}/`)) {
    await removeUploadedFile(previousThumbnail);
  }

  revalidatePath('/admin');
  revalidatePath(`/admin/${slug}`);
  revalidatePath('/');
  revalidatePath(`/service/${slug}`);
  revalidatePath(`/category/${service.categorySlug}`);
  return { message: '썸네일이 업로드되었습니다.' };
}

export async function deleteServiceThumbnail(slug: string): Promise<void> {
  ensureAdmin();

  const services = await readServices();
  const service = services.find((item) => item.slug === slug);
  if (!service || !service.thumbnail) return;

  const previousThumbnail = service.thumbnail;
  service.thumbnail = '';
  await writeServices(services);

  if (previousThumbnail.startsWith(`/uploads/${slug}/`)) {
    await removeUploadedFile(previousThumbnail);
  }

  revalidatePath('/admin');
  revalidatePath(`/admin/${slug}`);
  revalidatePath('/');
  revalidatePath(`/service/${slug}`);
  revalidatePath(`/category/${service.categorySlug}`);
}

export async function updateCategoryColor(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const color = readField(formData, 'color');
  if (!HEX_COLOR_PATTERN.test(color)) {
    return { error: '색상 코드는 #RRGGBB 형식으로 입력해주세요. (예: #fb7185)' };
  }

  const categories = await readCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { error: '카테고리를 찾을 수 없습니다.' };

  category.color = color;
  await writeCategories(categories);

  revalidatePath('/', 'layout');
  revalidatePath('/admin/categories');
  return { message: '색상이 저장되었습니다.' };
}

export async function resolveReport(id: number): Promise<void> {
  ensureAdmin();
  await updateReportStatus(id, 'resolved');
  revalidatePath('/admin/reports');
}

export async function dismissReport(id: number): Promise<void> {
  ensureAdmin();
  await updateReportStatus(id, 'dismissed');
  revalidatePath('/admin/reports');
}

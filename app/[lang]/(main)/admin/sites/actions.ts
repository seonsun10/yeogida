'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { readSiteCategories, readSites } from '@/lib/admin-data';
import { writeSiteCategories, writeSites } from '@/lib/admin-write';
import { ensureAdmin } from '@/lib/admin-auth';
import { getAllSiteCategories } from '@/lib/sites';
import type { Site } from '@/types/site';

export type ActionState = { error?: string; message?: string } | undefined;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;
const ALLOWED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE_LABEL = '5MB';
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'sites');

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
  return `/uploads/sites/${slug}/${fileName}`;
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
): Omit<Site, 'id' | 'slug' | 'images' | 'thumbnail'> | { error: string } {
  const name = readField(formData, 'name');
  const summary = readField(formData, 'summary');
  const description = readField(formData, 'description');
  const categorySlug = readField(formData, 'categorySlug');
  const url = readField(formData, 'url');
  const source = readField(formData, 'source');
  const lastVerified = readField(formData, 'lastVerified');
  const tags = parseListField(formData.get('tags'));
  const badges = parseListField(formData.get('badges'));

  if (!name || !summary || !description || !url || !source) {
    return { error: '필수 항목을 모두 입력해주세요.' };
  }
  if (!getAllSiteCategories().some((category) => category.slug === categorySlug)) {
    return { error: '카테고리를 선택해주세요.' };
  }

  return {
    name,
    summary,
    description,
    categorySlug,
    tags,
    url,
    badges,
    source,
    lastVerified: lastVerified || new Date().toISOString().slice(0, 10),
  };
}

export async function createSite(
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

  const sites = await readSites();
  if (sites.some((site) => site.slug === slug)) {
    return { error: '이미 사용 중인 슬러그입니다.' };
  }

  const newSite: Site = {
    id: slug,
    slug,
    images: [],
    thumbnail: '',
    ...fields,
  };

  sites.push(newSite);
  await writeSites(sites);

  revalidatePath('/admin/sites');
  revalidatePath('/discover');
  revalidatePath(`/discover/${newSite.categorySlug}`);
  redirect(`/admin/sites/${slug}`);
}

export async function updateSite(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const fields = buildFieldsFromForm(formData);
  if ('error' in fields) return fields;

  const sites = await readSites();
  const site = sites.find((item) => item.slug === slug);
  if (!site) return { error: '사이트를 찾을 수 없습니다.' };

  Object.assign(site, fields);
  await writeSites(sites);

  revalidatePath('/admin/sites');
  revalidatePath(`/admin/sites/${slug}`);
  revalidatePath('/discover');
  revalidatePath(`/discover/site/${slug}`);
  revalidatePath(`/discover/${site.categorySlug}`);
  return { message: '저장되었습니다.' };
}

export async function deleteSite(slug: string): Promise<void> {
  ensureAdmin();

  const sites = await readSites();
  const index = sites.findIndex((item) => item.slug === slug);
  if (index === -1) return;

  const [removed] = sites.splice(index, 1);
  await writeSites(sites);
  await fs.rm(path.join(UPLOADS_DIR, slug), { recursive: true, force: true });

  revalidatePath('/admin/sites');
  revalidatePath('/discover');
  revalidatePath(`/discover/${removed.categorySlug}`);
  redirect('/admin/sites');
}

export async function uploadSiteImages(
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

  const sites = await readSites();
  const site = sites.find((item) => item.slug === slug);
  if (!site) return { error: '사이트를 찾을 수 없습니다.' };

  for (const file of files) {
    const imagePath = await saveImageFile(slug, file, '');
    site.images.push(imagePath);
  }

  await writeSites(sites);

  revalidatePath(`/admin/sites/${slug}`);
  revalidatePath(`/discover/site/${slug}`);
  revalidatePath('/discover');
  return { message: '이미지가 업로드되었습니다.' };
}

export async function deleteSiteImage(
  slug: string,
  imagePath: string,
): Promise<void> {
  ensureAdmin();

  if (!imagePath.startsWith(`/uploads/sites/${slug}/`) || imagePath.includes('..')) {
    return;
  }

  const sites = await readSites();
  const site = sites.find((item) => item.slug === slug);
  if (!site) return;

  site.images = site.images.filter((image) => image !== imagePath);
  await writeSites(sites);
  await removeUploadedFile(imagePath);

  revalidatePath(`/admin/sites/${slug}`);
  revalidatePath(`/discover/site/${slug}`);
  revalidatePath('/discover');
}

export async function uploadSiteThumbnail(
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

  const sites = await readSites();
  const site = sites.find((item) => item.slug === slug);
  if (!site) return { error: '사이트를 찾을 수 없습니다.' };

  const previousThumbnail = site.thumbnail;
  const thumbnailPath = await saveImageFile(slug, file, 'thumbnail-');
  site.thumbnail = thumbnailPath;
  await writeSites(sites);

  if (previousThumbnail && previousThumbnail.startsWith(`/uploads/sites/${slug}/`)) {
    await removeUploadedFile(previousThumbnail);
  }

  revalidatePath('/admin/sites');
  revalidatePath(`/admin/sites/${slug}`);
  revalidatePath('/discover');
  revalidatePath(`/discover/site/${slug}`);
  revalidatePath(`/discover/${site.categorySlug}`);
  return { message: '썸네일이 업로드되었습니다.' };
}

export async function deleteSiteThumbnail(slug: string): Promise<void> {
  ensureAdmin();

  const sites = await readSites();
  const site = sites.find((item) => item.slug === slug);
  if (!site || !site.thumbnail) return;

  const previousThumbnail = site.thumbnail;
  site.thumbnail = '';
  await writeSites(sites);

  if (previousThumbnail.startsWith(`/uploads/sites/${slug}/`)) {
    await removeUploadedFile(previousThumbnail);
  }

  revalidatePath('/admin/sites');
  revalidatePath(`/admin/sites/${slug}`);
  revalidatePath('/discover');
  revalidatePath(`/discover/site/${slug}`);
  revalidatePath(`/discover/${site.categorySlug}`);
}

export async function updateSiteCategoryColor(
  slug: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const color = readField(formData, 'color');
  if (!HEX_COLOR_PATTERN.test(color)) {
    return { error: '색상 코드는 #RRGGBB 형식으로 입력해주세요. (예: #fb7185)' };
  }

  const categories = await readSiteCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { error: '카테고리를 찾을 수 없습니다.' };

  category.color = color;
  await writeSiteCategories(categories);

  revalidatePath('/discover', 'layout');
  revalidatePath('/admin/sites/categories');
  return { message: '색상이 저장되었습니다.' };
}

export async function createSiteCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  ensureAdmin();

  const slug = readField(formData, 'slug');
  const name = readField(formData, 'name');
  const description = readField(formData, 'description');
  const color = readField(formData, 'color') || '#a1a1aa';

  if (!SLUG_PATTERN.test(slug)) {
    return { error: '슬러그는 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.' };
  }
  if (!name || !description) {
    return { error: '필수 항목을 모두 입력해주세요.' };
  }
  if (!HEX_COLOR_PATTERN.test(color)) {
    return { error: '색상 코드는 #RRGGBB 형식으로 입력해주세요.' };
  }

  const categories = await readSiteCategories();
  if (categories.some((category) => category.slug === slug)) {
    return { error: '이미 사용 중인 슬러그입니다.' };
  }

  categories.push({ slug, name, description, color });
  await writeSiteCategories(categories);

  revalidatePath('/discover', 'layout');
  revalidatePath('/admin/sites/categories');
  return { message: '카테고리가 추가되었습니다.' };
}

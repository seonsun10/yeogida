import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllCategories } from '@/lib/services';
import { readServiceBySlug } from '@/lib/admin-data';
import {
  deleteServiceImage,
  deleteServiceThumbnail,
  updateService,
} from '../actions';
import { ServiceForm } from '../ServiceForm';
import { ImageUploadForm } from '../ImageUploadForm';
import { ThumbnailUploadForm } from '../ThumbnailUploadForm';
import { DeleteServiceButton } from '../DeleteServiceButton';

type EditServicePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { slug } = await params;
  const [service, categories] = await Promise.all([
    readServiceBySlug(slug),
    Promise.resolve(getAllCategories()),
  ]);

  if (!service) notFound();

  const updateAction = updateService.bind(null, slug);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-zinc-900">
          ← 목록으로
        </Link>
        <DeleteServiceButton slug={slug} />
      </div>

      <div>
        <h1 className="text-xl font-bold">{service.name} 수정</h1>
        <Link
          href={`/service/${slug}`}
          target="_blank"
          className="text-sm text-zinc-500 hover:underline"
        >
          공개 페이지 미리보기 →
        </Link>
      </div>

      <ServiceForm
        mode="edit"
        categories={categories}
        service={service}
        action={updateAction}
      />

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-lg font-semibold">썸네일 (목록/카드용)</h2>

        {service.thumbnail && (
          <div className="flex flex-col gap-2">
            <div className="relative aspect-video w-64 overflow-hidden rounded-md border">
              <Image
                src={service.thumbnail}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
            <form action={deleteServiceThumbnail.bind(null, slug)}>
              <button
                type="submit"
                className="text-xs text-red-600 hover:underline"
              >
                썸네일 삭제
              </button>
            </form>
          </div>
        )}
        {!service.thumbnail && (
          <p className="text-sm text-zinc-400">등록된 썸네일이 없습니다.</p>
        )}

        <ThumbnailUploadForm slug={slug} />
      </section>

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-lg font-semibold">상세페이지 이미지</h2>

        {service.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {service.images.map((image) => (
              <div key={image} className="flex flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-md border">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <form action={deleteServiceImage.bind(null, slug, image)}>
                  <button
                    type="submit"
                    className="text-xs text-red-600 hover:underline"
                  >
                    이미지 삭제
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
        {service.images.length === 0 && (
          <p className="text-sm text-zinc-400">등록된 이미지가 없습니다.</p>
        )}

        <ImageUploadForm slug={slug} />
      </section>
    </div>
  );
}

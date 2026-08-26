import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllSiteCategories } from '@/lib/sites';
import { readSiteBySlug } from '@/lib/admin-data';
import {
  deleteSiteImage,
  deleteSiteThumbnail,
  updateSite,
} from '../actions';
import { SiteForm } from '../SiteForm';
import { SiteImageUploadForm } from '../SiteImageUploadForm';
import { SiteThumbnailUploadForm } from '../SiteThumbnailUploadForm';
import { DeleteSiteButton } from '../DeleteSiteButton';

type EditSitePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditSitePage({ params }: EditSitePageProps) {
  const { slug } = await params;
  const [site, categories] = await Promise.all([
    readSiteBySlug(slug),
    Promise.resolve(getAllSiteCategories()),
  ]);

  if (!site) notFound();

  const updateAction = updateSite.bind(null, slug);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/admin/sites"
          className="text-sm text-zinc-500 hover:text-zinc-900"
        >
          ← 목록으로
        </Link>
        <DeleteSiteButton slug={slug} />
      </div>

      <div>
        <h1 className="text-xl font-bold">{site.name} 수정</h1>
        <Link
          href={`/discover/site/${slug}`}
          target="_blank"
          className="text-sm text-zinc-500 hover:underline"
        >
          공개 페이지 미리보기 →
        </Link>
      </div>

      <SiteForm mode="edit" categories={categories} site={site} action={updateAction} />

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-lg font-semibold">썸네일 (목록/카드용)</h2>

        {site.thumbnail && (
          <div className="flex flex-col gap-2">
            <div className="relative aspect-video w-64 overflow-hidden rounded-md border">
              <Image
                src={site.thumbnail}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
            <form action={deleteSiteThumbnail.bind(null, slug)}>
              <button type="submit" className="text-xs text-red-600 hover:underline">
                썸네일 삭제
              </button>
            </form>
          </div>
        )}
        {!site.thumbnail && (
          <p className="text-sm text-zinc-400">등록된 썸네일이 없습니다.</p>
        )}

        <SiteThumbnailUploadForm slug={slug} />
      </section>

      <section className="flex flex-col gap-4 border-t pt-6">
        <h2 className="text-lg font-semibold">상세페이지 이미지</h2>

        {site.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {site.images.map((image) => (
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
                <form action={deleteSiteImage.bind(null, slug, image)}>
                  <button type="submit" className="text-xs text-red-600 hover:underline">
                    이미지 삭제
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
        {site.images.length === 0 && (
          <p className="text-sm text-zinc-400">등록된 이미지가 없습니다.</p>
        )}

        <SiteImageUploadForm slug={slug} />
      </section>
    </div>
  );
}

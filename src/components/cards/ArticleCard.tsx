import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import { Clock, Image as ImageIcon, PlayCircle } from "lucide-react";
import { NewsArticle } from "@/src/types";
import { getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from "@/src/lib/youtube";

interface ArticleCardProps {
  article: NewsArticle;
  variant?: "default" | "compact" | "horizontal" | "featured";
}

const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  const {
    title,
    excerpt,
    featuredImage,
    featuredVideoId,
    category,
    author,
    slug,
  } = article;

  /**
   * Thumbnail with play-button overlay — used for small/linked slots where an
   * interactive iframe would conflict with navigation or look too cramped.
   */
  const renderThumbnail = (
    className: string,
    sizes: string,
    iconSize: "sm" | "md" | "lg" = "md",
  ) => {
    if (featuredVideoId) {
      const iconCls = { sm: "h-6 w-6", md: "h-10 w-10", lg: "h-14 w-14" }[iconSize];
      return (
        <div className="relative h-full w-full bg-black">
          <Image
            src={getYouTubeThumbnailUrl(featuredVideoId)}
            alt={title}
            fill
            className={className}
            sizes={sizes}
            priority={false}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
            <PlayCircle className={`${iconCls} text-white drop-shadow-lg transition-transform group-hover:scale-110`} />
          </div>
        </div>
      );
    }
    if (featuredImage) {
      return (
        <Image
          src={featuredImage}
          alt={title}
          fill
          className={className}
          sizes={sizes}
        />
      );
    }
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
    );
  };

  // ── Compact variant ───────────────────────────────────────────────────────
  if (variant === "compact") {
    return (
      <Link href={`/article/${slug}`} className="group block">
        <article className="flex items-start space-x-3">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            {renderThumbnail(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              "80px",
              "sm",
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-medium text-brand-600">
              {category.name}
            </span>
            <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-brand-600">
              {title}
            </h3>
          </div>
        </article>
      </Link>
    );
  }

  // ── Horizontal variant ────────────────────────────────────────────────────
  if (variant === "horizontal") {
    return (
      <Link href={`/article/${slug}`} className="group block">
        <article className="flex items-start space-x-4">
          <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
            {renderThumbnail(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              "(max-width: 640px) 128px, 160px",
              "sm",
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs text-white ${category.color}`}
            >
              {category.name}
            </span>
            <h3 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
              {title}
            </h3>
            <p className="mt-1 hidden line-clamp-2 text-sm text-gray-600 sm:block">
              {excerpt}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              <span className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {author.fullName}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // ── Featured variant ──────────────────────────────────────────────────────
  // Video articles: player on top, metadata below so the gradient overlay
  // doesn't block iframe interaction.
  if (variant === "featured") {
    if (featuredVideoId) {
      return (
        <article className="overflow-hidden rounded-xl bg-white dark:bg-[#1e2a26] shadow-sm">
          <div className="relative aspect-video bg-black">
            <iframe
              src={getYouTubeEmbedUrl(featuredVideoId)}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4 sm:p-6">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${category.color}`}>
              {category.name}
            </span>
            <Link href={`/article/${slug}`} className="group block">
              <h2 className="mt-3 text-xl font-bold leading-tight text-gray-900 dark:text-gray-100 transition-colors group-hover:text-brand-600 sm:text-2xl lg:text-3xl">
                {title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
                {excerpt}
              </p>
            </Link>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              <span className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                {author.fullName}
              </span>
            </div>
          </div>
        </article>
      );
    }

    return (
      <Link href={`/article/${slug}`} className="group block h-full">
        <article className="relative h-full min-h-[300px] overflow-hidden rounded-xl sm:min-h-[400px]">
          {renderThumbnail(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            "(max-width: 768px) 100vw, 800px",
            "lg",
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${category.color}`}>
              {category.name}
            </span>
            <h2 className="mt-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-brand-300 sm:text-2xl lg:text-3xl">
              {title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-gray-200 sm:text-base">
              {excerpt}
            </p>
            <div className="mt-3 text-xs text-gray-300 sm:text-sm">
              <span className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                {author.fullName}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // ── Default variant (vertical card) ──────────────────────────────────────
  return (
    <Link href={`/article/${slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1e2a26] shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="relative aspect-video overflow-hidden bg-black">
          <>
            {renderThumbnail(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
            )}
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white ${category.color}`}>
              {category.name}
            </span>
          </>
        </div>
        <div className="flex-1 p-4">
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-gray-100 transition-colors group-hover:text-brand-600">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{excerpt}</p>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
            <span>{author.fullName}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;

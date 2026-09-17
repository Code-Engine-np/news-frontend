import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/src/types";

/** Strip HTML tags and return plain text. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract the first two sentences from plain text.
 * Handles Nepali danda (।) as well as Latin punctuation (. ! ?).
 */
function firstTwoSentences(text: string): string {
  const sentences: string[] = [];
  // Split on sentence-ending punctuation followed by whitespace or end-of-string
  const parts = text.split(/(?<=[।।।!?.])\s+/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed) {
      sentences.push(trimmed);
      if (sentences.length === 2) break;
    }
  }
  return sentences.join(" ");
}

interface Props {
  articles: NewsArticle[];
  locale: string;
}

export default function BreakingNewsSection({ articles, locale }: Props) {
  if (articles.length === 0) return null;

  return (
    <div className="w-full border-b border-gray-200 dark:border-[#2a3832] mb-4 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-3 md:px-8">
        {articles.map((article) => {
          const plainContent = stripHtml(article.content ?? "");
          const description = firstTwoSentences(plainContent);

          return (
            <div key={article.id} className="mb-12 last:mb-0">
              {/* Title */}
              <Link href={`/${locale}/article/${article.slug}`} className="block">
                <h2 className="md:text-5xl cursor-pointer text-3xl font-bold leading-tight text-center text-gray-900 dark:text-gray-100 hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>
              </Link>

              {/* Author */}
              <p className="text-center text-gray-500 md:text-lg font-semibold mt-3 mb-7">
                रिपोर्ट{" "}
                <span className="text-gray-800 dark:text-gray-200">
                  / {article.author.fullName}
                </span>
              </p>

              {/* Image with summary caption overlay */}
              {article.featuredImage && (
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <Image
                    src={article.featuredImage}
                    className="w-full h-[280px] md:h-[520px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                    height={700}
                    width={1200}
                    alt={article.title}
                  />

                  <span className="absolute left-4 top-4 bg-red-600 text-white font-bold md:text-xl text-sm px-3 md:px-5 py-2 rounded-md shadow-lg">
                    Breaking News
                  </span>

                  {/* Summary as caption overlay at bottom of image */}
                  {article.excerpt && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-4 md:px-7">
                      <p className="text-white text-sm md:text-base italic leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* First two sentences of content as description */}
              {description && (
                <p className="md:text-xl text-base text-gray-700 dark:text-gray-300 text-center leading-[1.9] max-w-5xl mx-auto mt-7">
                  {description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

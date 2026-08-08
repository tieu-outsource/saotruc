import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.tinTucPage();
  return {
    title: page?.seoTitle ?? "Tin Tức - Sáo trúc Âu Cơ",
    description:
      page?.seoDescription ??
      "Tin tức, bài viết về sáo trúc, âm nhạc dân tộc và các hoạt động của Sáo trúc Âu Cơ.",
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function TinTucPage() {
  const [posts, page, contact] = await Promise.all([
    cms.posts(),
    cms.tinTucPage(),
    cms.siteSettings(),
  ]);
  const published = posts
    .filter((p) => p.entry.published)
    .sort((a, b) => (b.entry.date ?? "").localeCompare(a.entry.date ?? ""));

  return (
    <>
      <Header />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="news-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">{page?.title ?? "TIN TỨC"}</h1>
            <div className="divider-line" aria-hidden="true" />
          </div>

          <div className="news-intro">
            <p>
              {page?.intro ??
                "Những bài viết, chia sẻ về sáo trúc và âm nhạc dân tộc từ Sáo trúc Âu Cơ."}
            </p>
          </div>

          {published.length === 0 ? (
            <p className="news-empty">Chưa có bài viết nào.</p>
          ) : (
            <div className="news-grid">
              {published.map((post, idx) => (
                <article
                  key={post.slug}
                  className="news-card"
                  data-reveal
                  style={{ "--d": `${(idx % 3) * 110}ms` } as CSSProperties}
                >
                  {post.entry.cover && (
                    <div className="news-card-cover">
                      <img
                        src={`/assets/posts/${post.entry.cover}`}
                        alt={post.entry.title}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="news-card-body">
                    {post.entry.date && (
                      <time className="news-date">
                        {formatDate(post.entry.date)}
                      </time>
                    )}
                    <h2 className="news-card-title">
                      <Link href={`/tin-tuc/${post.slug}`}>
                        {post.entry.title}
                      </Link>
                    </h2>
                    {post.entry.excerpt && (
                      <p className="news-card-excerpt">{post.entry.excerpt}</p>
                    )}
                    <Link
                      href={`/tin-tuc/${post.slug}`}
                      className="news-read-more"
                    >
                      ĐỌC TIẾP
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer settings={contact} />
    </>
  );
}

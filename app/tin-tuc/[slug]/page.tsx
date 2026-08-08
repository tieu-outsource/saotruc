import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";

export async function generateStaticParams() {
  const posts = await cms.posts();
  return posts.filter((p) => p.entry.published).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await cms.post(slug);
  if (!post || !post.published) return {};
  const postTitle = `${post.title} - Sáo trúc Âu Cơ`;
  const ogImage = post.cover
    ? { url: `/assets/posts/${post.cover}`, alt: post.title }
    : {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Sáo trúc Âu Cơ - Sáo Trúc & Âm Nhạc Dân Tộc",
      };
  return {
    title: postTitle,
    description: post.excerpt ?? undefined,
    openGraph: {
      type: "article",
      locale: "vi_VN",
      siteName: "Sáo trúc Âu Cơ",
      title: postTitle,
      description: post.excerpt ?? undefined,
      images: [ogImage],
      publishedTime: post.date ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: post.excerpt ?? undefined,
      images: [ogImage.url],
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, contact] = await Promise.all([
    cms.post(slug),
    cms.siteSettings(),
  ]);
  if (!post || !post.published) notFound();

  return (
    <>
      <Header />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <article className="post-container">
          <header className="post-header">
            <h1>{post.title}</h1>
            {post.date && <time>{formatDate(post.date)}</time>}
          </header>
          {post.cover && (
            <img
              className="post-cover"
              src={`/assets/posts/${post.cover}`}
              alt={post.title}
            />
          )}
          <div className="post-content">
            <DocumentRenderer document={post.content} />
          </div>
        </article>
      </main>
      <Footer settings={contact} />
    </>
  );
}

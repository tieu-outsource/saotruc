import Header from "@/components/Header";
import type { CSSProperties } from "react";
import Services from "@/components/Services";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";

export default async function HomePage() {
  const [settings, contact] = await Promise.all([
    cms.settings(),
    cms.siteSettings(),
  ]);
  const benefits = (settings?.heroBenefits ?? []).map((b) => ({
    icon: b.icon,
    text: b.text ?? "",
  }));
  const heroSlides = (settings?.heroSlides ?? []).map((s) => ({
    image: s.image ?? null,
    title: s.title ?? "",
    accent: s.accent ?? "",
    description: s.description ?? "",
    primaryLabel: s.primaryLabel ?? "",
    primaryHref: s.primaryHref ?? "#services",
    secondaryLabel: s.secondaryLabel ?? "",
    secondaryHref: s.secondaryHref ?? "#contact",
  }));
  const defaultSlide: HeroSlide = {
    image: null,
    title: "Kết nối tâm hồn",
    accent: "Qua từng thanh sáo",
    description:
      "Dạy học – Biểu diễn – Sản phẩm & Dịch vụ chuyên nghiệp về sáo trúc và âm nhạc dân tộc.",
    primaryLabel: "KHÁM PHÁ DỊCH VỤ",
    primaryHref: "#services",
    secondaryLabel: "TƯ VẤN",
    secondaryHref: "#contact",
  };
  const slides = heroSlides.length > 0 ? heroSlides : [defaultSlide];
  const pinnedPosts = contact.pinnedPosts ?? [];

  return (
    <>
      <Header />
      <main>
        <HeroSlider slides={slides} benefits={benefits} />

        <Services />
        <Socials />

        {pinnedPosts.length > 0 && (
          <section className="pinned-posts" id="news">
            <div className="section-divider" data-reveal>
              <div className="divider-line" aria-hidden="true" />
              <h2 className="section-divider-title">TIN TỨC NỔI BẬT</h2>
              <div className="divider-line" aria-hidden="true" />
            </div>
            <div className="pinned-posts-grid">
              {pinnedPosts.map((post, idx) => (
                <article
                  key={post.slug}
                  className="pinned-post-card"
                  data-reveal
                  style={{ "--d": `${(idx % 3) * 110}ms` } as CSSProperties}
                >
                  {post.cover && (
                    <div className="pinned-post-cover">
                      <img src={post.cover} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="pinned-post-content">
                    <time className="pinned-post-date" dateTime={post.date ?? undefined}>
                      {post.date ? new Date(post.date).toLocaleDateString("vi-VN") : ""}
                    </time>
                    <h3 className="pinned-post-title">
                      <a href={`/tin-tuc/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className="pinned-post-excerpt">{post.excerpt}</p>
                    <a href={`/tin-tuc/${post.slug}`} className="pinned-post-link">
                      Đọc thêm <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="pinned-posts-cta" data-reveal>
              <a href="/tin-tuc" className="btn btn-outline">
                XEM TẤT CẢ TIN TỨC
              </a>
            </div>
          </section>
        )}
        <ContactForm
          title={contact.contactTitle}
          intro={contact.contactIntro}
          submitLabel={contact.contactSubmitLabel}
        />
      </main>
      <Footer settings={contact} />
    </>
  );
}
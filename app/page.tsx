import Header from "@/components/Header";
import Services from "@/components/Services";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";

export default async function HomePage() {
  const [settings, contact] = await Promise.all([
    cms.settings(),
    cms.siteSettings(),
  ]);
  const benefits = (settings?.heroBenefits ?? []).map((b) => ({
    icon: b.icon,
    text: b.text ?? "",
  }));
  const pinnedPosts = contact.pinnedPosts ?? [];

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                {settings?.heroTitle ?? "Kết nối tâm hồn"}
                <span>{settings?.heroAccent ?? "Qua từng thanh sáo"}</span>
              </h1>
              <p className="hero-description">
                {settings?.heroDescription ??
                  "Dạy học – Biểu diễn – Sản phẩm & Dịch vụ chuyên nghiệp về sáo trúc và âm nhạc dân tộc."}
              </p>
              <div className="hero-buttons">
                <a href="#services" className="btn btn-primary" id="btn-explore">
                  KHÁM PHÁ DỊCH VỤ
                </a>
                <a href="#about" className="btn btn-outline" id="btn-about">
                  VỀ CHÚNG TÔI
                </a>
              </div>
            </div>

            <div className="hero-benefits">
              {benefits.map((b) => (
                <div key={b.text} className="benefit-item">
                  <div className="benefit-icon-wrapper" aria-hidden="true">
                    <i className={b.icon} />
                  </div>
                  <span className="benefit-text">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <Socials />

        {pinnedPosts.length > 0 && (
          <section className="pinned-posts" id="news">
            <div className="section-divider">
              <div className="divider-line" aria-hidden="true" />
              <h2 className="section-divider-title">TIN TỨC NỔI BẬT</h2>
              <div className="divider-line" aria-hidden="true" />
            </div>
            <div className="pinned-posts-grid">
              {pinnedPosts.map((post) => (
                <article key={post.slug} className="pinned-post-card">
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
            <div className="pinned-posts-cta">
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
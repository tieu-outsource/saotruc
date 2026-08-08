import Header from "@/components/Header";
import Services from "@/components/Services";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";

export default async function HomePage() {
  const [settings, contact] = await Promise.all([
    cms.settings(),
    cms.contactSettings(),
  ]);
  const benefits = (settings?.heroBenefits ?? []).map((b) => ({
    icon: b.icon,
    text: b.text ?? "",
  }));

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
        <ContactForm />
      </main>
      <Footer settings={contact} />
    </>
  );
}

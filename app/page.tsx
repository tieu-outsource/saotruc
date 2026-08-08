import Header from "@/components/Header";
import Services from "@/components/Services";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Kết nối tâm hồn
                <span>Qua từng thanh sáo</span>
              </h1>
              <p className="hero-description">
                Dạy học – Biểu diễn – Sản phẩm &amp; Dịch vụ chuyên nghiệp về sáo
                trúc và âm nhạc dân tộc.
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
              <div className="benefit-item">
                <div className="benefit-icon-wrapper" aria-hidden="true">
                  <i className="fa-solid fa-music" />
                </div>
                <span className="benefit-text">Phương pháp bài bản, dễ hiểu</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-wrapper" aria-hidden="true">
                  <i className="fa-solid fa-user" />
                </div>
                <span className="benefit-text">Giáo viên chuyên nghiệp</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-wrapper" aria-hidden="true">
                  <i className="fa-solid fa-star" />
                </div>
                <span className="benefit-text">Học viên trên toàn quốc</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-wrapper" aria-hidden="true">
                  <i className="fa-solid fa-heart" />
                </div>
                <span className="benefit-text">
                  Đam mê – Tận tâm – Truyền cảm hứng
                </span>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Socials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

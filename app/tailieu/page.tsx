import type { Metadata } from "next";
import Header from "@/components/Header";
import StorePayment from "@/components/StorePayment";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mua Tài Liệu Sáo Trúc - Hồng Việt",
  description:
    "Mua giáo trình sáo trúc cơ bản, nâng cao và sheet nhạc cảm âm chuẩn từ Hồng Việt Sáo Trúc.",
};

export default function TailieuPage() {
  return (
    <>
      <Header activeHome={false} />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="store-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">CỬA HÀNG TÀI LIỆU</h1>
            <div className="divider-line" aria-hidden="true" />
          </div>

          <div
            className="store-intro"
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 50px",
              padding: "0 20px",
            }}
          >
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
              Tổng hợp tài liệu nhạc lý, giáo trình thổi sáo từ cơ bản đến nâng
              cao cùng hàng ngàn bản sheet nhạc, cảm âm chuẩn được biên soạn độc
              quyền bởi Hồng Việt.
            </p>
          </div>

          <StorePayment />
        </section>
      </main>
      <Footer />
    </>
  );
}

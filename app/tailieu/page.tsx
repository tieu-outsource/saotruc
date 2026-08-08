import type { Metadata } from "next";
import Header from "@/components/Header";
import StorePayment from "@/components/StorePayment";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";
import type { DocumentItem } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.tailieuPage();
  return {
    title: page?.seoTitle ?? "Mua Tài Liệu Sáo Trúc - Sáo trúc Âu Cơ",
    description:
      page?.seoDescription ??
      "Mua giáo trình sáo trúc cơ bản, nâng cao và sheet nhạc cảm âm chuẩn từ Sáo trúc Âu Cơ.",
  };
}

export default async function TailieuPage() {
  const [store, page, contact] = await Promise.all([
    cms.storeItems(),
    cms.tailieuPage(),
    cms.siteSettings(),
  ]);
  const items: DocumentItem[] = [...store]
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map((s) => ({
      id: s.slug,
      title: s.entry.title,
      price: s.entry.price,
      code: s.entry.code ?? "",
      badge: s.entry.badge ?? undefined,
      coverClass: s.entry.coverClass ?? undefined,
      coverIcon: s.entry.coverIcon ?? "",
      coverTag: s.entry.coverTag ?? "",
      desc: s.entry.desc ?? "",
    }));

  return (
    <>
      <Header />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="store-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">{page?.title ?? "CỬA HÀNG TÀI LIỆU"}</h1>
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
              {page?.intro ??
                "Tổng hợp tài liệu nhạc lý, giáo trình thổi sáo từ cơ bản đến nâng cao cùng hàng ngàn bản sheet nhạc, cảm âm chuẩn được biên soạn độc quyền bởi Sáo trúc Âu Cơ."}
            </p>
          </div>

          <StorePayment items={items} settings={contact} />
        </section>
      </main>
      <Footer settings={contact} />
    </>
  );
}
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";
import type { SaoProductItem } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.saoPage();
  return {
    title: page?.seoTitle ?? "Cửa Hàng Sáo Trúc, Dizi, Sáo Mèo - Sáo trúc Âu Cơ",
    description:
      page?.seoDescription ??
      "Mua sáo trúc cao cấp, sáo Dizi, sáo Nứa, sáo Mèo và phụ kiện sáo chọn lọc chuẩn âm từ Sáo trúc Âu Cơ. Bảo hành âm thanh trọn đời.",
  };
}

export default async function CuaHangSaoPage() {
  const [page, contact] = await Promise.all([
    cms.saoPage(),
    cms.siteSettings(),
  ]);

  const items: SaoProductItem[] = (page?.items ?? []).map((i: any) => ({
    title: i.title,
    price: i.price ?? undefined,
    badge: i.badge ?? undefined,
    image: i.image ?? null,
    desc: i.desc ?? undefined,
    btnLabel: i.btnLabel ?? undefined,
    btnHref: i.btnHref ?? undefined,
  }));

  return (
    <>
      <Header activeHome={false} />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="sao-store-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">
              {page?.title ?? "BÁN CÁC LOẠI SÁO & PHỤ KIỆN"}
            </h1>
            <div className="divider-line" aria-hidden="true" />
          </div>

          {page?.intro && (
            <div
              className="store-intro"
              style={{
                textAlign: "center",
                maxWidth: 750,
                margin: "0 auto 50px",
                padding: "0 20px",
              }}
            >
              <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
                {page.intro}
              </p>
            </div>
          )}

          <div
            className="sao-store-container"
            style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 20px" }}
          >
            <div className="sao-store-grid">
              {items.map((item: SaoProductItem, idx: number) => (
                <article key={idx} className="sao-product-card">
                  {item.badge && <div className="sao-product-badge">{item.badge}</div>}
                  {item.image && (
                    <div className="sao-product-image-wrapper">
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </div>
                  )}
                  <div className="sao-product-body">
                    <h2 className="sao-product-title">{item.title}</h2>
                    {item.price && (
                      <div className="sao-product-price">{item.price}</div>
                    )}
                    {item.desc && (
                      <p className="sao-product-desc">{item.desc}</p>
                    )}
                  </div>
                  {item.btnLabel && (
                    <a
                      href={item.btnHref || "/#register"}
                      className="btn btn-primary sao-product-btn"
                    >
                      <i className="fa-solid fa-cart-shopping" aria-hidden="true" style={{ marginRight: 8 }} />
                      {item.btnLabel}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={contact} />
    </>
  );
}

import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KhoaHocClient from "@/components/KhoaHocClient";
import { cms } from "@/lib/reader";
import type { CourseItem } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const page = await cms.khoaHocPage();
  return {
    title: page?.seoTitle ?? "Khóa Học Thổi Sáo Trúc Quay Sẵn - Sáo trúc Âu Cơ",
    description:
      page?.seoDescription ??
      "Học thổi sáo trúc online qua video bài giảng quay sẵn HD. Học mọi lúc mọi nơi, truy cập trọn đời, được hỗ trợ từ giáo viên Sáo trúc Âu Cơ.",
  };
}

export default async function KhoaHocQuaySanPage() {
  const [courseItems, page, contact] = await Promise.all([
    cms.courses(),
    cms.khoaHocPage(),
    cms.siteSettings(),
  ]);

  const courses: CourseItem[] = [...courseItems]
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map((c) => ({
      id: c.entry.code || c.slug,
      title: c.entry.title,
      duration: c.entry.duration ?? undefined,
      badge: c.entry.badge ?? undefined,
      price: c.entry.price,
      desc: c.entry.desc ?? undefined,
      coverIcon: c.entry.coverIcon ?? undefined,
      coverTag: c.entry.coverTag ?? undefined,
    }));

  return (
    <>
      <Header />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="khoahoc-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">
              {page?.title ?? "KHÓA HỌC QUAY SẴN (VIDEO COURSES)"}
            </h1>
            <div className="divider-line" aria-hidden="true" />
          </div>

          <div
            className="khoahoc-intro"
            style={{
              textAlign: "center",
              maxWidth: 750,
              margin: "0 auto 50px",
              padding: "0 20px",
            }}
          >
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6 }}>
              {page?.intro ??
                "Tổng hợp các khóa học thổi sáo trúc, dizi, sáo nứa từ cơ bản đến nâng cao được ghi hình chất lượng cao HD. Học viên mua khóa học được cấp tài khoản xem trọn đời, hỗ trợ trực tiếp từ giáo viên qua Zalo."}
            </p>
          </div>

          <KhoaHocClient courses={courses} settings={contact} />
        </section>
      </main>
      <Footer settings={contact} />
    </>
  );
}

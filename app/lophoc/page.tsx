import type { Metadata } from "next";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Socials from "@/components/Socials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { cms } from "@/lib/reader";

export const metadata: Metadata = {
  title: "Lớp Học Các Bộ Môn - Hồng Việt Sáo Trúc",
  description:
    "Lớp học sáo trúc, dizi, sáo nứa, sáo mèo và các bộ môn dân tộc khác tại Hồng Việt Sáo Trúc. Học gia sư tại nhà, trực tiếp tại trung tâm hoặc online 1 kèm 1.",
};

export default async function LophocPage() {
  const [classes, classesPage, contact] = await Promise.all([
    cms.classCards(),
    cms.classesPage(),
    cms.contactSettings(),
  ]);
  const CLASSES = [...classes]
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map((c) => ({
      icon: c.entry.icon,
      title: c.entry.title,
      desc: c.entry.desc ?? "",
      features: c.entry.features,
    }));
  const FORMATS = (classesPage?.formats ?? []).map((f) => ({
    icon: f.icon,
    title: f.title ?? "",
    desc: f.desc ?? "",
  }));

  return (
    <>
      <Header activeHome={false} />
      <main style={{ paddingTop: 130, minHeight: "85vh" }}>
        <section className="lophoc-section">
          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h1 className="section-divider-title">LỚP HỌC CÁC BỘ MÔN</h1>
            <div className="divider-line" aria-hidden="true" />
          </div>

          <div className="lophoc-intro">
            <p>
              {classesPage?.intro ??
                "Phương pháp bài bản, dễ hiểu cùng đội ngũ giáo viên chuyên nghiệp, tận tâm — đồng hành cùng học viên trên toàn quốc trên hành trình chinh phục cây sáo và âm nhạc dân tộc."}
            </p>
          </div>

          <div className="lophoc-grid">
            {CLASSES.map((c) => (
              <article key={c.title} className="lophoc-card">
                <div className="lophoc-card-icon" aria-hidden="true">
                  <i className={c.icon} />
                </div>
                <h2 className="lophoc-card-title">{c.title}</h2>
                <p className="lophoc-card-desc">{c.desc}</p>
                <ul className="lophoc-features">
                  {c.features.map((f) => (
                    <li key={f}>
                      <i className="fa-solid fa-check" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="section-divider" style={{ marginTop: 20 }}>
            <div className="divider-line" aria-hidden="true" />
            <h2 className="section-divider-title">HÌNH THỨC HỌC</h2>
            <div className="divider-line" aria-hidden="true" />
          </div>

          <div className="lophoc-formats">
            {FORMATS.map((f) => (
              <div key={f.title} className="lophoc-format">
                <i className={f.icon} aria-hidden="true" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="lophoc-cta">
            <a href="/#register" className="btn btn-primary" id="btn-register-lophoc">
              ĐĂNG KÝ HỌC NGAY
            </a>
          </div>
        </section>
      </main>
      <Footer settings={contact} />
    </>
  );
}

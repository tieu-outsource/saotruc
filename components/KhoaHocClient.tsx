"use client";

import { useState } from "react";
import type { CourseItem, SiteSettings } from "@/lib/types";
import PaymentModal from "./PaymentModal";

export default function KhoaHocClient({
  courses,
  settings,
}: {
  courses: CourseItem[];
  settings?: SiteSettings;
}) {
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  return (
    <>
      <div
        className="khoahoc-container"
        style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 20px" }}
      >
        <div className="khoahoc-grid">
          {courses.map((course) => (
            <article className="khoahoc-card" key={course.id}>
              {course.badge && <div className="khoahoc-badge">{course.badge}</div>}
              <div className="khoahoc-cover-wrapper">
                <div className="khoahoc-cover">
                  <i className={course.coverIcon || "fa-solid fa-laptop"} />
                  <span className="cover-tag">{course.coverTag || "KHÓA HỌC VIDEO"}</span>
                </div>
              </div>
              <div className="khoahoc-info">
                <h2 className="khoahoc-title">{course.title}</h2>
                {course.duration && (
                  <div className="khoahoc-duration">
                    <i className="fa-solid fa-circle-play" aria-hidden="true" style={{ marginRight: 6 }} />
                    {course.duration}
                  </div>
                )}
                <p className="khoahoc-desc">{course.desc}</p>
                <div className="khoahoc-purchase-row">
                  <div className="khoahoc-price">
                    {course.price.toLocaleString("vi-VN")}đ
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary buy-now-btn"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <i className="fa-solid fa-cart-shopping" aria-hidden="true" style={{ marginRight: 8 }} />
                    MUA KHÓA HỌC
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <PaymentModal
        open={Boolean(selectedCourse)}
        onClose={() => setSelectedCourse(null)}
        item={
          selectedCourse
            ? {
                id: selectedCourse.id,
                title: selectedCourse.title,
                price: selectedCourse.price,
                code: selectedCourse.id,
                typeLabel: "Khóa Học Video Quay Sẵn",
              }
            : null
        }
        settings={settings}
      />
    </>
  );
}

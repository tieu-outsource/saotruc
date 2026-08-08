"use client";

import { useState } from "react";
import type { DocumentItem, SiteSettings } from "@/lib/types";
import PaymentModal from "./PaymentModal";

export default function StorePayment({
  items,
  settings,
}: {
  items: DocumentItem[];
  settings?: SiteSettings;
}) {
  const [selectedItem, setSelectedItem] = useState<DocumentItem | null>(null);

  return (
    <>
      <div
        className="store-container"
        style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 20px" }}
      >
        <div className="store-grid">
          {items.map((item) => (
            <article className="store-card" key={item.id}>
              {item.badge && <div className="store-card-badge">{item.badge}</div>}
              <div className="store-cover-wrapper">
                <div className={`store-cover${item.coverClass ? ` ${item.coverClass}` : ""}`}>
                  <i className={item.coverIcon || "fa-solid fa-file-pdf"} />
                  <span className="cover-tag">{item.coverTag || "FILE TÀI LIỆU"}</span>
                </div>
              </div>
              <div className="store-info">
                <h2 className="store-item-title">{item.title}</h2>
                <p className="store-item-desc">{item.desc}</p>
                <div className="store-purchase-row">
                  <div className="store-item-price">
                    {item.price.toLocaleString("vi-VN")}đ
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary buy-now-btn"
                    onClick={() => setSelectedItem(item)}
                  >
                    <i className="fa-solid fa-cart-shopping" aria-hidden="true" style={{ marginRight: 8 }} />
                    MUA NGAY
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <PaymentModal
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        item={
          selectedItem
            ? {
                id: selectedItem.id,
                title: selectedItem.title,
                price: selectedItem.price,
                code: selectedItem.code,
                typeLabel: "File Tài Liệu / Giáo Trình",
              }
            : null
        }
        settings={settings}
      />
    </>
  );
}

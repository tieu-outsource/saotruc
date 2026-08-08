"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-motto-wrapper">
          <div className="footer-icon-wrapper" aria-hidden="true">
            <i className="fa-solid fa-music" />
          </div>
          <div className="footer-motto">
            <span className="footer-title">
              {settings?.footerMotto ?? "ĐAM MÊ LÀM NÊN GIÁ TRỊ - CHẤT LƯỢNG TẠO NÊN UY TÍN"}
            </span>
            <span className="footer-subtitle">
              {settings?.footerSubtitle ?? "Đồng hành cùng bạn trên hành trình chạm đến âm nhạc truyền thống."}
            </span>
          </div>
        </div>
        <button
          type="button"
          className="footer-cta"
          id="btn-consultation"
          onClick={() => setShowContact(true)}
        >
          <i className="fa-solid fa-phone" aria-hidden="true" />
          {settings?.footerCtaLabel ?? "LIÊN HỆ TƯ VẤN"}
        </button>
      </div>
      <ContactModal
        open={showContact}
        onClose={() => setShowContact(false)}
        settings={settings}
      />
    </footer>
  );
}

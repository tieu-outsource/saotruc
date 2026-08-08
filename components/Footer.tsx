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

      {(settings?.footerBottomText ||
        (settings?.footerCustomFields && settings.footerCustomFields.length > 0) ||
        settings?.footerCopyright) && (
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            {settings?.footerCustomFields && settings.footerCustomFields.length > 0 && (
              <div className="footer-custom-fields">
                {settings.footerCustomFields.map((field, i) => (
                  <div key={i} className="footer-field-item">
                    {field.label && <span className="footer-field-label">{field.label}:</span>}
                    <span className="footer-field-value">{field.value}</span>
                  </div>
                ))}
              </div>
            )}

            {settings?.footerBottomText && (
              <div className="footer-bottom-text">
                {settings.footerBottomText.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            )}

            {settings?.footerCopyright && (
              <div className="footer-copyright">
                {settings.footerCopyright}
              </div>
            )}
          </div>
        </div>
      )}
      <ContactModal
        open={showContact}
        onClose={() => setShowContact(false)}
        settings={settings}
      />
    </footer>
  );
}

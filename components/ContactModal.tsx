"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { socialLink } from "@/lib/socials";
import type { SiteSettings } from "@/lib/types";

const FALLBACK: SiteSettings = {
  phoneRaw: "0382910471",
  phoneDisplay: "0382 910 471",
  zalo: "0382910471",
  socials: [],
  footerMotto: "",
  footerSubtitle: "",
  footerCtaLabel: "",
  contactTitle: "",
  contactIntro: "",
  contactSubmitLabel: "",
  pinnedPosts: [],
};

export default function ContactModal({
  open,
  onClose,
  settings,
}: {
  open: boolean;
  onClose: () => void;
  settings?: SiteSettings;
}) {
  const [mounted, setMounted] = useState(false);
  const contact = settings ?? FALLBACK;

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="contact-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Liên hệ tư vấn"
    >
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Đóng"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <div className="contact-modal-header">
          <i className="fa-solid fa-phone-volume" aria-hidden="true" />
          <h3>LIÊN HỆ TƯ VẤN</h3>
        </div>
        <div className="contact-modal-list">
          <a
            className="contact-modal-item"
            href={`tel:+84${contact.phoneRaw.replace(/^0/, "")}`}
          >
            <span className="contact-modal-icon">
              <i className="fa-solid fa-phone" aria-hidden="true" />
            </span>
            <span className="contact-modal-text">
              <span className="contact-modal-label">Hotline tư vấn</span>
              <span className="contact-modal-value">{contact.phoneDisplay}</span>
            </span>
          </a>
          <a
            className="contact-modal-item"
            href={`https://zalo.me/${contact.zalo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-modal-icon">
              <i className="fa-solid fa-comment-dots" aria-hidden="true" />
            </span>
            <span className="contact-modal-text">
              <span className="contact-modal-label">Zalo</span>
              <span className="contact-modal-value">Chat với Sáo trúc Âu Cơ</span>
            </span>
          </a>
          {contact.socials.map((social) => {
            const meta = socialLink(social.network);
            return (
              <a
                key={social.network}
                className="contact-modal-item"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-modal-icon">
                  <i className={meta.icon} aria-hidden="true" />
                </span>
                <span className="contact-modal-text">
                  <span className="contact-modal-label">{meta.platform}</span>
                  <span className="contact-modal-value">{social.handle}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

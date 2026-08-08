"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SOCIALS } from "./Socials";

const PHONE_RAW = "0382910471";
const PHONE_DISPLAY = "0382 910 471";

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  if (!open) return null;

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
            href={`tel:+84${PHONE_RAW.slice(1)}`}
          >
            <span className="contact-modal-icon">
              <i className="fa-solid fa-phone" aria-hidden="true" />
            </span>
            <span className="contact-modal-text">
              <span className="contact-modal-label">Hotline tư vấn</span>
              <span className="contact-modal-value">{PHONE_DISPLAY}</span>
            </span>
          </a>
          <a
            className="contact-modal-item"
            href={`https://zalo.me/${PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-modal-icon">
              <i className="fa-solid fa-comment-dots" aria-hidden="true" />
            </span>
            <span className="contact-modal-text">
              <span className="contact-modal-label">Zalo</span>
              <span className="contact-modal-value">Chat với Hồng Việt</span>
            </span>
          </a>
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              className="contact-modal-item"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-modal-icon">
                <i className={social.icon} aria-hidden="true" />
              </span>
              <span className="contact-modal-text">
                <span className="contact-modal-label">{social.platform}</span>
                <span className="contact-modal-value">{social.handle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

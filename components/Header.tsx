"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/#about", label: "Giới thiệu" },
  { href: "/lophoc", label: "Lớp học" },
  { href: "/#products", label: "Sản phẩm" },
  { href: "/#services", label: "Dịch vụ" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/#contact", label: "Liên hệ" },
];

export default function Header({ activeHome }: { activeHome?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const home = activeHome !== false;

  return (
    <header id="site-header" className={scrolled ? "scrolled" : ""}>
      <div className="header-container">
        <a href="/" className="logo-link" aria-label="Sáo trúc Âu Cơ - Trang chủ">
          <Logo />
        </a>

        <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="nav-menu">
          <li>
            <a
              href="/"
              className={`nav-link${home ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Trang chủ
            </a>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-nav-cta-item">
            <a
              href="/#register"
              className="mobile-nav-cta"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
              ĐĂNG KÝ HỌC NGAY
            </a>
          </li>
        </ul>

        <div className="header-actions">
          <a href="/#register" className="header-cta" id="header-cta-btn">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
            <span className="header-cta-text">ĐĂNG KÝ HỌC</span>
          </a>

          <button
            className="mobile-menu-toggle"
            id="menu-toggle"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
          </button>
        </div>
      </div>
    </header>
  );
}

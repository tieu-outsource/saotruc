"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/#about", label: "Giới thiệu" },
  { href: "/#classes", label: "Lớp học" },
  { href: "/#products", label: "Sản phẩm" },
  { href: "/#services", label: "Dịch vụ" },
  { href: "/#news", label: "Tin tức" },
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
        <a href="/" className="logo-link" aria-label="Hồng Việt - Trang chủ">
          <Logo />
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

        <ul
          className={`nav-menu${menuOpen ? " active" : ""}`}
          id="nav-menu"
          style={
            menuOpen
              ? {
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "rgba(13, 11, 9, 0.95)",
                  padding: "20px",
                  borderBottom: "1px solid var(--border-gold)",
                }
              : undefined
          }
        >
          <li>
            <a
              href={home ? "/" : "/"}
              className={`nav-link${home ? " active" : ""}`}
            >
              Trang chủ
            </a>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="/#register" className="header-cta" id="header-cta-btn">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          ĐĂNG KÝ HỌC
        </a>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
type NavLink = { href: string; label: string; section?: string };

const SECTION_IDS = ["news", "services", "contact"] as const;

const NAV_LINKS: NavLink[] = [
  { href: "/#news", label: "Tin tức", section: "news" },
  { href: "/lophoc", label: "Lớp học" },
  { href: "/#services", label: "Dịch vụ", section: "services" },
  { href: "/#contact", label: "Liên hệ", section: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const activeSectionRef = useRef<string | null>(null);

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

  // Scroll spy: highlight the nav item for the home section currently in view
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const setSection = (id: string | null) => {
      if (activeSectionRef.current === id) return;
      activeSectionRef.current = id;
      setActiveSection(id);
    };
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSection(entry.target.id);
            return;
          }
        }
        const changed = new Set(entries.map((e) => e.target.id));
        if (activeSectionRef.current && changed.has(activeSectionRef.current)) {
          setSection(null);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      activeSectionRef.current = null;
    };
  }, [pathname]);

  const homeActive = pathname === "/" && activeSection === null;

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.section) {
      if (pathname === "/") return activeSection === link.section;
      return link.section === "news" && pathname.startsWith("/tin-tuc");
    }
    return pathname === link.href;
  };

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
              className={`nav-link${homeActive ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Trang chủ
            </a>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link${isActive(link) ? " active" : ""}`}
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

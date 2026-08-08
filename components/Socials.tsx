export const SOCIALS = [
  {
    platform: "YouTube",
    handle: "Kênh sáo Hồng Việt",
    btn: "XEM KÊNH",
    href: "https://youtube.com",
    className: "youtube",
    icon: "fa-brands fa-youtube",
  },
  {
    platform: "Fanpage Facebook",
    handle: "Hồng Việt Sáo Trúc",
    btn: "THEO DÕI",
    href: "https://facebook.com",
    className: "facebook",
    icon: "fa-brands fa-facebook-f",
  },
  {
    platform: "TikTok",
    handle: "@hongvietsao",
    btn: "THEO DÕI",
    href: "https://tiktok.com",
    className: "tiktok",
    icon: "fa-brands fa-tiktok",
  },
  {
    platform: "Instagram",
    handle: "@hongviet.music",
    btn: "THEO DÕI",
    href: "https://instagram.com",
    className: "instagram",
    icon: "fa-brands fa-instagram",
  },
];

export default function Socials() {
  return (
    <section className="socials-section">
      <div className="section-divider">
        <div className="divider-line" aria-hidden="true" />
        <h2 className="section-divider-title">2.9 KẾT NỐI VỚI CHÚNG TÔI</h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="socials">
        <div className="socials-grid">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card ${social.className}`}
            >
              <div className="social-icon-wrapper" aria-hidden="true">
                <i className={social.icon} />
              </div>
              <div className="social-info">
                <div className="social-platform">{social.platform}</div>
                <div className="social-handle">{social.handle}</div>
              </div>
              <button className="social-btn" tabIndex={-1}>
                {social.btn}
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

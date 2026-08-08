import type { CSSProperties } from "react";
import { cms } from "@/lib/reader";
import { socialLink } from "@/lib/socials";

export default async function Socials() {
  const settings = await cms.settings();
  const socials = settings?.socials ?? [];

  return (
    <section className="socials-section">
      <div className="section-divider" data-reveal>
        <div className="divider-line" aria-hidden="true" />
        <h2 className="section-divider-title">KẾT NỐI VỚI CHÚNG TÔI</h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="socials">
        <div className="socials-grid">
          {socials.map((social, idx) => {
            const meta = socialLink(social.network);
            return (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card ${meta.className}`}
                data-reveal
                style={{ "--d": `${(idx % 4) * 90}ms` } as CSSProperties}
              >
                <div className="social-icon-wrapper" aria-hidden="true">
                  <i className={meta.icon} />
                </div>
                <div className="social-info">
                  <div className="social-platform">{meta.platform}</div>
                  <div className="social-handle">{social.handle}</div>
                </div>
                <button className="social-btn" tabIndex={-1}>
                  {social.btn}
                </button>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

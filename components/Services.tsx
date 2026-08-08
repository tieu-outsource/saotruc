import { cms } from "@/lib/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";

type ServiceCard = {
  bg: string;
  num: string;
  title: string;
  content: unknown;
  priceTitle?: string;
  priceAmount?: string;
  giftNote?: string;
  btnLabel?: string;
  btnHref?: string;
  btnId?: string;
};

/** Reader returns the document as an array of block nodes (the root's children). */
const toDocument = (content: unknown) =>
  (Array.isArray(content)
    ? content
    : (content as { children?: unknown } | null)?.children ?? []) as any;

export default async function Services() {
  const services = await cms.services();
  const cards: ServiceCard[] = [...services]
    .sort((a, b) => a.entry.num.localeCompare(b.entry.num, "vi", { numeric: true }))
    .map((s) => ({
      bg: s.entry.bg ?? "",
      num: s.entry.num,
      title: s.entry.title,
      content: s.entry.content ?? null,
      priceTitle: s.entry.priceTitle ?? undefined,
      priceAmount: s.entry.priceAmount ?? undefined,
      giftNote: s.entry.giftNote ?? undefined,
      btnLabel: s.entry.btnLabel ?? undefined,
      btnHref: s.entry.btnHref ?? undefined,
      btnId: `btn-service-${s.entry.num}`,
    }));

  return (
    <section id="services" className="services-section">
      <div className="section-divider">
        <div className="divider-line" aria-hidden="true" />
        <h2 className="section-divider-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="services">
        <div className="services-grid">
          {cards.map((card) => (
            <article key={card.num} className="service-card">
              <div
                className="card-bg"
                aria-hidden="true"
                style={{ backgroundImage: `url('/assets/features/${card.bg}')` }}
              />
              <div className="service-card-header">
                <div className="card-num">{card.num}</div>
                <h3 className="service-title">{card.title}</h3>
              </div>
              <div className="service-card-content">
                <div className="service-doc">
                  <DocumentRenderer document={toDocument(card.content)} />
                </div>
                {card.priceTitle && (
                  <div className="price-box">
                    <div className="price-box-title">{card.priceTitle}</div>
                    <div className="price-box-amount">{card.priceAmount}</div>
                  </div>
                )}
              </div>
              {card.giftNote && (
                <div className="gift-note">
                  <i className="fa-solid fa-gift" aria-hidden="true" />
                  <span>{card.giftNote}</span>
                </div>
              )}
              {card.btnLabel &&
                (card.btnHref ? (
                  <a href={card.btnHref} className="card-btn" id={card.btnId}>
                    {card.btnLabel}
                  </a>
                ) : (
                  <button className="card-btn" id={card.btnId}>
                    {card.btnLabel}
                  </button>
                ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCard = {
  bg: string;
  num: string;
  title: string;
  items: string[];
  nestedItems?: Record<string, string[]>;
  priceTitle?: string;
  priceAmount?: string;
  giftNote?: string;
  btnLabel?: string;
  btnHref?: string;
  btnId?: string;
};

const SERVICES: ServiceCard[] = [
  {
    num: "2.1",
    bg: "lophoc.avif",
    title: "LỚP HỌC CÁC BỘ MÔN",
    items: ["Sáo trúc", "Dizi", "Sáo nứa", "Sáo mèo", "Và các bộ môn dân tộc khác"],
    btnLabel: "XEM CHI TIẾT",
    btnId: "btn-service-2.1",
  },
  {
    num: "2.2",
    bg: "dangkykhoahoc.avif",
    title: "ĐĂNG KÍ LỚP HỌC",
    items: ["Gia sư tại nhà", "Học trực tiếp tại trung tâm", "Học online 1 kèm 1"],
    btnLabel: "ĐĂNG KÝ NGAY",
    btnId: "btn-service-2.2",
  },
  {
    num: "2.3",
    bg: "ban_sao.avif",
    title: "BÁN CÁC LOẠI SÁO",
    items: ["Sáo trúc cao cấp", "Sáo dizi", "Sáo nứa, sáo mèo", "Phụ kiện sáo"],
    btnLabel: "MUA NGAY",
    btnId: "btn-service-2.3",
  },
  {
    num: "2.4",
    bg: "khoahocquaysan.avif",
    title: "KHÓA HỌC QUAY SẴN",
    items: ["Sáo trúc cơ bản", "Sáo trúc nâng cao", "Sáo dizi & sáo nứa"],
    btnLabel: "XEM CHI TIẾT",
    btnId: "btn-service-2.4",
  },
  {
    num: "2.5",
    bg: "tailieu.avif",
    title: "BÁN TÀI LIỆU",
    items: [
      "Giáo trình",
      "Sheet nhạc",
    ],
    nestedItems: {
      "Giáo trình": ["Giáo trình ABC cơ bản", "Giáo trình nâng cao"],
      "Sheet nhạc": ["Chuyển soạn theo yêu cầu"],
    },
    priceTitle: "Sheet nhạc",
    priceAmount: "100.000đ / sheet",
    btnLabel: "XEM NGAY",
    btnHref: "/tailieu",
    btnId: "btn-service-2.5",
  },
  {
    num: "2.6",
    bg: "thuam.avif",
    title: "DỊCH VỤ THU ÂM, QUAY MV SÁO",
    items: ["Thu âm chuyên nghiệp", "Quay MV chất lượng cao", "Dựng video, chỉnh màu"],
    priceTitle: "Gói Full Combo",
    priceAmount: "2.500.000đ / 1 bài",
    giftNote: "Học viên học hết khóa 3 tháng được tặng 1 MV làm kỷ niệm",
  },
  {
    num: "2.7",
    bg: "bookband.avif",
    title: "BOOKING NGHỆ SĨ THỔI SÁO, BAND NHẠC DÂN TỘC",
    items: ["Biểu diễn sự kiện", "Hòa tấu, độc tấu sáo", "Ban nhạc dân tộc"],
    btnLabel: "LIÊN HỆ BOOKING",
    btnId: "btn-service-2.7",
  },
  {
    num: "2.8",
    bg: "thuam-chong-nhac.avif",
    title: "DỊCH VỤ THU ÂM CHỒNG NHẠC THẬT",
    items: ["Thu âm các nhạc cụ dân tộc kết hợp hiện đại"],
    nestedItems: {
      "Thu âm các nhạc cụ dân tộc kết hợp hiện đại": [
        "Tranh, Sáo, Bầu, Guitar, Đàn tranh,...",
      ],
    },
    priceTitle: "Đơn giá",
    priceAmount: "500.000đ / 1 bài / 1 nhạc cụ",
    btnLabel: "LIÊN HỆ NGAY",
    btnId: "btn-service-2.8",
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="section-divider">
        <div className="divider-line" aria-hidden="true" />
        <h2 className="section-divider-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="services">
        <div className="services-grid">
          {SERVICES.map((card) => (
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
                <ul className="service-list">
                  {card.items.map((item) => (
                    <li key={item}>
                      {item}
                      {card.nestedItems?.[item] && (
                        <ul>
                          {card.nestedItems[item].map((sub) => (
                            <li key={sub}>{sub}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
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

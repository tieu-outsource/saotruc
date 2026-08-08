"use client";

import { useEffect, useRef, useState } from "react";

type DocumentItem = {
  id: string;
  title: string;
  price: number;
  code: string;
  badge?: string;
  coverClass?: string;
  coverIcon: string;
  coverTag: string;
  desc: string;
};

export const STORE_ITEMS: DocumentItem[] = [
  {
    id: "giaotrinh-basic",
    title: "Giáo Trình Sáo Trúc Cơ Bản ABC",
    price: 150000,
    code: "GT_SAOTRUC_CB",
    badge: "Bán chạy",
    coverIcon: "fa-solid fa-book-open",
    coverTag: "HỒNG VIỆT",
    desc: "Tài liệu lý thuyết nhập môn chi tiết dành cho người chưa biết gì. Bao gồm cách lấy hơi, thế bấm các nốt nhạc trên sáo 6 lỗ & 10 lỗ, kèm 20 bài tập thực hành cảm âm cơ bản.",
  },
  {
    id: "giaotrinh-advanced",
    title: "Giáo Trình Sáo Trúc Nâng Cao",
    price: 300000,
    code: "GT_SAOTRUC_NC",
    badge: "Chuyên sâu",
    coverClass: "premium",
    coverIcon: "fa-solid fa-graduation-cap",
    coverTag: "NÂNG CAO",
    desc: "Huấn luyện kỹ thuật ngón, rung hơi, láy, vuốt, tăng tốc ngón và kỹ xảo thổi sáo nghệ thuật. Tặng kèm bộ 10 bản beat nhạc đệm chuẩn phòng thu độc quyền để luyện tập.",
  },
  {
    id: "sheet-longme",
    title: "Sheet & Cảm âm: Lòng Mẹ",
    price: 50000,
    code: "SHEET_LONG_ME",
    coverClass: "sheet",
    coverIcon: "fa-solid fa-music",
    coverTag: "SOLO SHEET",
    desc: "Bản ký âm nốt nhạc kết hợp cảm âm chi tiết (dành cho sáo trúc Đô C5 & Sol Trầm G4). Giai điệu mượt mà, đầy cảm xúc, thích hợp trình diễn trong các sự kiện gia đình.",
  },
  {
    id: "sheet-tayvuong",
    title: "Sheet & Cảm âm: Tây Vương Nữ Quốc",
    price: 50000,
    code: "SHEET_TAY_VUONG",
    coverClass: "sheet",
    coverIcon: "fa-solid fa-music",
    coverTag: "HOT TREND",
    desc: "Bản phối cảm âm thần sầu nhạc phim Tây Du Ký. Ghi chú rõ ràng từng đoạn luyến láy, vuốt nốt giúp người chơi lột tả được vẻ u sầu, tha thiết đặc trưng của bài nhạc.",
  },
];

export default function StorePayment() {
  const [current, setCurrent] = useState<DocumentItem | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [statusText, setStatusText] = useState("Đang chờ quét mã chuyển khoản...");
  const [spinner, setSpinner] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function openModal(item: DocumentItem) {
    setCurrent(item);
    setStep(1);
    setSpinner(true);
    setStatusText("Đang chờ quét mã chuyển khoản...");
    timers.current.forEach(clearTimeout);
    timers.current = [];

    // Simulated payment verification flow (kept from original site)
    timers.current.push(
      setTimeout(() => {
        setStatusText("Đang xác thực giao dịch chuyển khoản...");
        timers.current.push(
          setTimeout(() => {
            setSpinner(false);
            setStatusText("Thanh toán thành công! Đang chuyển hướng...");
            timers.current.push(
              setTimeout(() => {
                setStep(2);
              }, 1500)
            );
          }, 3000)
        );
      }, 4000)
    );
  }

  function closeModal() {
    setCurrent(null);
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function handleDownload() {
    if (!current) return;
    const content = `%PDF-1.4\n%âãÏÓ\n1 0 obj\n<<\n/Title (${current.title})\n/Author (Hong Viet)\n/Subject (Sáo Trúc & Âm Nhạc Dân Tộc)\n>>\nendobj\n2 0 obj\n<<\n/Type /Catalog\n/Pages 3 0 R\n>>\nendobj\n3 0 obj\n<<\n/Type /Pages\n/Kids [4 0 R]\n/Count 1\n>>\nendobj\n4 0 obj\n<<\n/Type /Page\n/Parent 3 0 R\n/MediaBox [0 0 595.28 841.89]\n/Contents 5 0 R\n/Resources << >>\n>>\nendobj\n5 0 obj\n<< /Length 120 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(SAO TRUC HONG VIET - DOCUMENT STORE) Tj\n/F1 14 Tf\n0 -50 Td\n(Tai lieu: ${current.title}) Tj\n0 -30 Td\n(Gia mua: ${current.price.toLocaleString("vi-VN")} VND - Giao dich: THANH CONG) Tj\n0 -30 Td\n(Cam on ban da ung ho am nhac truyen thong Viet Nam!) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000079 00000 n \n0000000173 00000 n \n0000000301 00000 n \n0000000380 00000 n \ntrailer\n<<\n/Size 6\n/Root 2 0 R\n>>\nstartxref\n491\n%%EOF`;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const cleanFileName = current.title
      .toLowerCase()
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "_");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${cleanFileName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="store-container" style={{ maxWidth: 1200, margin: "0 auto 100px", padding: "0 20px" }}>
        <div className="store-grid">
          {STORE_ITEMS.map((item) => (
            <article className="store-card" key={item.id}>
              {item.badge && <div className="store-card-badge">{item.badge}</div>}
              <div className="store-cover-wrapper">
                <div className={`store-cover${item.coverClass ? ` ${item.coverClass}` : ""}`}>
                  <i className={item.coverIcon} />
                  <span className="cover-tag">{item.coverTag}</span>
                </div>
              </div>
              <div className="store-info">
                <h2 className="store-item-title">{item.title}</h2>
                <p className="store-item-desc">{item.desc}</p>
                <div className="store-purchase-row">
                  <div className="store-item-price">
                    {item.price.toLocaleString("vi-VN")}đ
                  </div>
                  <button
                    className="btn btn-primary buy-now-btn"
                    onClick={() => openModal(item)}
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className={`modal-overlay${current ? " active" : ""}`}
        id="payment-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="payment-modal-card">
          <button
            className="modal-close-btn"
            id="modal-close"
            aria-label="Đóng"
            onClick={closeModal}
          >
            &times;
          </button>

          {current && step === 1 && (
            <div id="payment-flow-step-1">
              <h3 className="modal-title">Thanh toán mua tài liệu</h3>
              <p className="modal-doc-name" id="modal-doc-title">
                {current.title}
              </p>

              <div className="payment-layout">
                <div className="payment-info-box">
                  <h4 className="payment-subtitle">Thông tin chuyển khoản</h4>
                  <div className="payment-details">
                    <div className="detail-row">
                      <span className="detail-label">Ngân hàng:</span>
                      <span className="detail-value">MBBank (Quân Đội)</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Số tài khoản:</span>
                      <span className="detail-value">0382910471</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Chủ tài khoản:</span>
                      <span className="detail-value">NGUYEN HONG VIET</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Số tiền:</span>
                      <span className="detail-value accent">
                        {current.price.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Nội dung chuyển khoản:</span>
                      <span className="detail-value accent">{current.code}</span>
                    </div>
                  </div>
                  <p className="payment-disclaimer">
                    <i className="fa-solid fa-circle-info" aria-hidden="true" />{" "}
                    Vui lòng quét mã QR hoặc nhập chính xác nội dung chuyển khoản
                    bên trên để hệ thống tự động xác nhận và mở khóa tải file.
                  </p>
                </div>

                <div className="payment-qr-box">
                  <div className="qr-container">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      id="payment-qr-img"
                      src={`https://img.vietqr.io/image/MB-0382910471-compact2.png?amount=${current.price}&addInfo=${encodeURIComponent(
                        current.code
                      )}&accountName=NGUYEN%20HONG%20VIET`}
                      alt="Mã QR VietQR Chuyển khoản"
                    />
                    <div className="qr-watermark">
                      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                        <path d="M12 52L52 12" stroke="#b89047" strokeWidth="4" />
                        <path d="M12 12L52 52" stroke="#b89047" strokeWidth="4" />
                      </svg>
                    </div>
                  </div>
                  <div className="payment-status-wrapper">
                    {spinner && <div className="spinner" id="payment-spinner" />}
                    <i
                      className="fa-solid fa-circle-check success-icon"
                      id="payment-success-icon"
                      style={{ display: spinner ? "none" : "inline-block" }}
                    />
                    <span className="payment-status-text" id="payment-status-text">
                      {statusText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {current && step === 2 && (
            <div
              id="payment-flow-step-2"
              style={{ textAlign: "center", padding: "20px 0" }}
            >
              <div className="success-checkmark-wrapper">
                <div className="success-checkmark">
                  <div className="check-icon">
                    <span className="icon-line line-tip" />
                    <span className="icon-line line-long" />
                    <div className="icon-circle" />
                    <div className="icon-fix" />
                  </div>
                </div>
              </div>
              <h3 className="success-title">Thanh Toán Thành Công!</h3>
              <p className="success-desc">
                Giao dịch mua{" "}
                <strong id="success-doc-name">{current.title}</strong> đã được xác
                nhận. Vui lòng bấm vào nút bên dưới để tải xuống tài liệu ngay lập
                tức.
              </p>
              <button
                className="btn btn-primary download-action-btn"
                id="download-btn"
                style={{ maxWidth: 320, margin: "30px auto 0" }}
                onClick={handleDownload}
              >
                <i
                  className="fa-solid fa-file-arrow-down"
                  style={{ marginRight: 8 }}
                />
                TẢI XUỐNG TÀI LIỆU (PDF)
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

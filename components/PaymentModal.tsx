"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { SiteSettings } from "@/lib/types";

export type PayableItem = {
  id: string;
  title: string;
  price: number;
  code?: string;
  typeLabel?: string;
};

export default function PaymentModal({
  open,
  onClose,
  item,
  settings,
}: {
  open: boolean;
  onClose: () => void;
  item: PayableItem | null;
  settings?: SiteSettings;
}) {
  const [mounted, setMounted] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "confirmed" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedField, setCopiedField] = useState<"acc" | "code" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  const bankId = settings?.bankId || "ICB";
  const bankAccountNo = settings?.bankAccountNo || "113366668888";
  const bankAccountName = settings?.bankAccountName || "SAO TRUC AU CO";
  const itemCode = item?.code || item?.id || "AUCO_STORE";
  function handleCopy(text: string, field: "acc" | "code") {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  }

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setBuyerName("");
      setBuyerPhone("");
      setErrorMsg("");
      return;
    }

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

  if (!mounted || !open || !item) return null;

  const vietQrUrl = `https://img.vietqr.io/image/${bankId}-${bankAccountNo}-compact.jpg?amount=${
    item.price
  }&addInfo=${encodeURIComponent(itemCode)}&accountName=${encodeURIComponent(
    bankAccountName
  )}`;

  async function handleConfirmPayment() {
    if (!item) return;
    if (!buyerPhone.trim()) {
      setErrorMsg("Vui lòng nhập Số điện thoại (hoặc Zalo) để chúng tôi liên hệ gửi file / bài học.");
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "purchase",
          name: buyerName,
          phone: buyerPhone,
          itemName: item.title,
          itemType: item.typeLabel || "File Tài Liệu / Khóa Học",
          itemPrice: item.price,
          itemCode,
          bankInfo: `${bankId.toUpperCase()} (${bankAccountNo}) - ${bankAccountName}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể gửi thông tin xác nhận");
      }

      setStatus("confirmed");
    } catch {
      setStatus("confirmed");
    }
  }

  return createPortal(
    <div
      className="payment-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="payment-modal-backdrop" onClick={onClose} />
      <div className="payment-modal-card">
        <button
          type="button"
          className="payment-modal-close"
          aria-label="Đóng"
          onClick={onClose}
        >
          &times;
        </button>

        {status !== "confirmed" ? (
          <>
            <div className="payment-modal-header">
              <h3 id="payment-modal-title" className="payment-modal-title">
                Thanh Toán Qua VietQR
              </h3>
              <p className="payment-modal-subtitle">{item.title}</p>
            </div>

            <div className="payment-modal-grid">
              <div className="payment-info-side">
                <h4 className="payment-box-heading">THÔNG TIN CHUYỂN KHOẢN</h4>
                <div className="payment-detail-list">
                  <div className="payment-detail-row">
                    <span className="detail-label">Ngân hàng:</span>
                    <span className="detail-value bold">{bankId.toUpperCase()}</span>
                  </div>
                  <div className="payment-detail-row">
                    <span className="detail-label">Số tài khoản:</span>
                    <div className="detail-value-wrapper">
                      <span className="detail-value bold copyable">{bankAccountNo}</span>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => handleCopy(bankAccountNo, "acc")}
                        title="Sao chép số tài khoản"
                      >
                        {copiedField === "acc" ? "Đã chép ✓" : "Sao chép"}
                      </button>
                    </div>
                  </div>
                  <div className="payment-detail-row">
                    <span className="detail-label">Chủ tài khoản:</span>
                    <span className="detail-value bold">{bankAccountName}</span>
                  </div>
                  <div className="payment-detail-row">
                    <span className="detail-label">Số tiền thanh toán:</span>
                    <span className="detail-value price-tag">
                      {item.price.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="payment-detail-row">
                    <span className="detail-label">Nội dung chuyển khoản:</span>
                    <div className="detail-value-wrapper">
                      <span className="detail-value code-tag">{itemCode}</span>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => handleCopy(itemCode, "code")}
                        title="Sao chép nội dung chuyển khoản"
                      >
                        {copiedField === "code" ? "Đã chép ✓" : "Sao chép"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="payment-user-inputs">
                  <h4 className="payment-box-heading">THÔNG TIN NGƯỜI MUA</h4>
                  <div className="payment-input-field">
                    <label htmlFor="buyer-name">Họ và tên (không bắt buộc)</label>
                    <input
                      id="buyer-name"
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                    />
                  </div>
                  <div className="payment-input-field">
                    <label htmlFor="buyer-phone">Số điện thoại / Zalo nhận file *</label>
                    <input
                      id="buyer-phone"
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại Zalo"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                    />
                  </div>
                  {errorMsg && <p className="payment-input-error">{errorMsg}</p>}
                </div>
              </div>

              <div className="payment-qr-side">
                <div className="vietqr-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vietQrUrl}
                    alt="Mã VietQR thanh toán"
                    className="vietqr-img"
                  />
                </div>
                <a
                  href={vietQrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={`VietQR_${itemCode}.jpg`}
                  className="download-qr-link"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" style={{ marginRight: 6 }} />
                  Tải / Mở ảnh QR
                </a>
                <button
                  type="button"
                  className="btn btn-primary payment-confirm-btn"
                  disabled={status === "sending"}
                  onClick={handleConfirmPayment}
                >
                  {status === "sending" ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" style={{ marginRight: 8 }} />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ marginRight: 8 }} />
                      XÁC NHẬN ĐÃ CHUYỂN KHOẢN
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="payment-success-notice">
            <div className="success-icon-wrapper">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
            </div>
            <h3 className="success-notice-title">Đã Nhận Thông Tin Xác Nhận!</h3>
            <div className="success-notice-box">
              <p className="notice-main-text">
                Hệ thống đang xử lý đơn hàng của bạn cho sản phẩm:
              </p>
              <p className="notice-item-name">{item.title}</p>
              <p className="notice-sub-text">
                Sáo trúc Âu Cơ sẽ kiểm tra giao dịch chuyển khoản và liên hệ gửi file / bài học qua SĐT/Zalo{" "}
                <strong>{buyerPhone}</strong> trong thời gian sớm nhất!
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline payment-done-btn"
              onClick={onClose}
            >
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

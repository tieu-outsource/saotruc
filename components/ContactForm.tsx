"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message, website }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `HTTP ${res.status}`);
      }
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-divider">
        <div className="divider-line" aria-hidden="true" />
        <h2 id="consultation" className="section-divider-title">
          LIÊN HỆ &amp; ĐĂNG KÝ HỌC
        </h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-intro">
            <p>
              Để lại thông tin, Hồng Việt sẽ liên hệ tư vấn khóa học, mua sáo,
              tài liệu hoặc dịch vụ thu âm, biểu diễn trong thời gian sớm nhất.
            </p>
            <ul className="contact-channels">
              <li>
                <i className="fa-solid fa-phone" aria-hidden="true" />
                Hotline tư vấn: gọi qua nút{" "}
                <a href="/#consultation" className="contact-inline-link">
                  LIÊN HỆ TƯ VẤN
                </a>{" "}
                bên dưới
              </li>
              <li>
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Hoặc gửi tin nhắn qua biểu mẫu, thông tin sẽ được chuyển trực
                tiếp đến Hồng Việt
              </li>
            </ul>
          </div>

          <form id="register" className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="contact-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="contact-field">
              <label htmlFor="contact-name">Họ và tên *</label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
              />
            </div>
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="contact-phone">Số điện thoại *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại liên hệ"
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (không bắt buộc)"
                />
              </div>
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Nội dung *</label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bạn quan tâm đến khóa học, sản phẩm hay dịch vụ nào?"
              />
            </div>

            {status === "success" && (
              <p className="contact-status contact-status-success" role="status">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                Đã gửi thành công! Hồng Việt sẽ liên hệ bạn trong thời gian sớm
                nhất.
              </p>
            )}
            {status === "error" && (
              <p className="contact-status contact-status-error" role="alert">
                <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
                Gửi thất bại. Vui lòng kiểm tra lại thông tin và thử lại, hoặc
                liên hệ trực tiếp qua mạng xã hội.
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />{" "}
                  ĐANG GỬI...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" /> GỬI
                  ĐĂNG KÝ
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

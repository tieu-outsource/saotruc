"use client";

import { useState, useEffect, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({
  title,
  intro,
  submitLabel,
}: {
  title: string;
  intro: string;
  submitLabel: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    function getTopicFromUrl() {
      if (typeof window === "undefined") return "";
      const searchParams = new URLSearchParams(window.location.search);
      let val =
        searchParams.get("topic") ||
        searchParams.get("message") ||
        searchParams.get("service") ||
        searchParams.get("course");
      if (val) return val;

      const hash = window.location.hash;
      if (hash.includes("?")) {
        const hashQuery = hash.slice(hash.indexOf("?"));
        const hashParams = new URLSearchParams(hashQuery);
        val =
          hashParams.get("topic") ||
          hashParams.get("message") ||
          hashParams.get("service") ||
          hashParams.get("course");
        if (val) return val;
      }
      return "";
    }

    const updateTopic = () => {
      const topic = getTopicFromUrl();
      if (topic) {
        setMessage(topic);
      }
    };

    updateTopic();

    const handleHashOrState = () => {
      setTimeout(updateTopic, 50);
    };

    window.addEventListener("popstate", handleHashOrState);
    window.addEventListener("hashchange", handleHashOrState);

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (target) {
        const href = target.getAttribute("href") || "";
        if (href.includes("topic=") || href.includes("message=")) {
          try {
            const url = new URL(href, window.location.origin);
            const topic =
              url.searchParams.get("topic") || url.searchParams.get("message");
            if (topic) {
              setMessage(topic);
              return;
            }
          } catch {
            const match = href.match(/(?:topic|message)=([^&]+)/);
            if (match && match[1]) {
              setMessage(decodeURIComponent(match[1]));
            }
          }
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", handleHashOrState);
      window.removeEventListener("hashchange", handleHashOrState);
      document.removeEventListener("click", handleClick);
    };
  }, []);

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
          {title}
        </h2>
        <div className="divider-line" aria-hidden="true" />
      </div>

      <div className="contact-container">
        <div className="contact-card">
          <div className="contact-intro">
            <p>{intro}</p>
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
                tiếp đến Sáo trúc Âu Cơ
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
                Đã gửi thành công! Sáo trúc Âu Cơ sẽ liên hệ bạn trong thời gian sớm
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
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" />{" "}
                  {submitLabel}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

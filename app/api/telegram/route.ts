import { NextResponse } from "next/server";

type ContactPayload = {
  type?: "contact" | "purchase";
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  website?: string;
  // Purchase specific fields
  itemName?: string;
  itemType?: string;
  itemPrice?: number | string;
  itemCode?: string;
  bankInfo?: string;
};

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram bot chưa được cấu hình" },
      { status: 500 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field; pretend success without forwarding.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name ?? "").trim().slice(0, 100);
  const phone = (payload.phone ?? "").trim().slice(0, 30);
  const email = (payload.email ?? "").trim().slice(0, 120);
  const message = (payload.message ?? "").trim().slice(0, 2000);

  let text = "";

  if (payload.type === "purchase") {
    const itemName = (payload.itemName ?? "").trim();
    const itemType = (payload.itemType ?? "Sản phẩm").trim();
    const itemPrice = payload.itemPrice
      ? `${Number(payload.itemPrice).toLocaleString("vi-VN")}đ`
      : "Liên hệ";
    const itemCode = (payload.itemCode ?? "").trim();
    const bankInfo = (payload.bankInfo ?? "").trim();

    const lines = [
      "🛒 *ĐƠN HÀNG MỚI (XÁC NHẬN VIETQR)*",
      "",
      `👤 *Khách hàng:* ${name || "Chưa nhập tên"}`,
      `📞 *SĐT / Zalo:* ${phone || "Chưa nhập SĐT"}`,
      `📦 *Sản phẩm:* ${itemName}`,
      `🏷️ *Loại:* ${itemType}`,
      `💰 *Giá tiền:* ${itemPrice}`,
      `🔖 *Mã chuyển khoản:* \`${itemCode}\``,
    ];
    if (bankInfo) lines.push(`🏦 *Tài khoản nhận:* ${bankInfo}`);
    lines.push(
      "",
      "⚠️ *Ghi chú:* Khách đã nhấn nút xác nhận chuyển khoản qua VietQR. Vui lòng kiểm tra tài khoản và gửi file / video qua SĐT trên!"
    );
    text = lines.join("\n");
  } else {
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ họ tên, số điện thoại và nội dung" },
        { status: 400 }
      );
    }
    const lines = [
      "🎵 *Liên hệ mới từ website Sáo trúc Âu Cơ*",
      "",
      `👤 *Họ tên:* ${name}`,
      `📞 *Số điện thoại:* ${phone}`,
    ];
    if (email) lines.push(`✉️ *Email:* ${email}`);
    lines.push("", `📝 *Nội dung:*`, message);
    text = lines.join("\n");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Telegram sendMessage failed:", res.status, body);
    return NextResponse.json(
      { error: "Không gửi được tin nhắn tới Telegram" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

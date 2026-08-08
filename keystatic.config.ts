import { config, collection, singleton, fields } from "@keystatic/core";

const FA_ICONS = [
  { label: "Nốt nhạc", value: "fa-solid fa-music" },
  { label: "Gió", value: "fa-solid fa-wind" },
  { label: "Lá", value: "fa-solid fa-leaf" },
  { label: "Sóng âm", value: "fa-solid fa-waveform" },
  { label: "Đàn guitar", value: "fa-solid fa-guitar" },
  { label: "Gia sư tại nhà", value: "fa-solid fa-house-user" },
  { label: "Trung tâm", value: "fa-solid fa-building-columns" },
  { label: "Laptop", value: "fa-solid fa-laptop" },
  { label: "Sách", value: "fa-solid fa-book-open" },
  { label: "Mũ tốt nghiệp", value: "fa-solid fa-graduation-cap" },
  { label: "Người dùng", value: "fa-solid fa-user" },
  { label: "Ngôi sao", value: "fa-solid fa-star" },
  { label: "Trái tim", value: "fa-solid fa-heart" },
  { label: "Điện thoại", value: "fa-solid fa-phone" },
  { label: "Envelope", value: "fa-solid fa-envelope" },
  { label: "Chuông", value: "fa-solid fa-bell" },
  { label: "Nhà", value: "fa-solid fa-house" },
];

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Hồng Việt Sáo Trúc" },
  },
  collections: {
    services: collection({
      label: "Dịch vụ (DỊCH VỤ CỦA CHÚNG TÔI)",
      slugField: "title",
      path: "content/services/*",
      format: { data: "yaml" },
      columns: ["title", "num"],
      schema: {
        num: fields.text({ label: "Số thứ tự (VD: 2.1)" }),
        title: fields.slug({
          name: { label: "Tiêu đề (VD: LỚP HỌC CÁC BỘ MÔN)" },
          slug: { label: "Slug (đường dẫn, không dấu)" },
        }),
        items: fields.array(fields.text({ label: "Mục" }), {
          label: "Danh sách mục",
          itemLabel: (p) => p.value ?? "Mục",
        }),
        nestedItems: fields.array(
          fields.object(
            {
              parent: fields.text({ label: "Mục cha" }),
              children: fields.array(fields.text({ label: "Mục con" }), {
                label: "Mục con",
              }),
            },
            { label: "Mục lồng nhau" }
          ),
          { label: "Mục lồng nhau (cha → con)" }
        ),
        priceTitle: fields.text({ label: "Tiêu đề giá (VD: Sheet nhạc)" }),
        priceAmount: fields.text({ label: "Đơn giá (VD: 100.000đ / sheet)" }),
        giftNote: fields.text({ label: "Ghi chú quà tặng" }),
        btnLabel: fields.text({ label: "Nhãn nút (VD: XEM CHI TIẾT)" }),
        btnHref: fields.text({ label: "Đường dẫn nút (VD: /lophoc, /tailieu)" }),
        bg: fields.image({
          label: "Ảnh nền thẻ",
          directory: "public/assets/features",
          publicPath: "/assets/features/",
        }),
      },
    }),
    classCards: collection({
      label: "Lớp học - Các bộ môn",
      slugField: "title",
      path: "content/classCards/*",
      format: { data: "yaml" },
      columns: ["title"],
      schema: {
        order: fields.number({ label: "Thứ tự hiển thị", defaultValue: 1 }),
        title: fields.slug({
          name: { label: "Tên bộ môn (VD: SÁO TRÚC)" },
          slug: { label: "Slug (đường dẫn, không dấu)" },
        }),
        icon: fields.select({ label: "Icon", options: FA_ICONS, defaultValue: "fa-solid fa-music" }),
        desc: fields.text({ label: "Mô tả", multiline: true }),
        features: fields.array(fields.text({ label: "Điểm nổi bật" }), {
          label: "Điểm nổi bật",
          itemLabel: (p) => p.value ?? "Điểm nổi bật",
        }),
      },
    }),
    storeItems: collection({
      label: "Tài liệu bán (CỬA HÀNG TÀI LIỆU)",
      slugField: "title",
      path: "content/storeItems/*",
      format: { data: "yaml" },
      columns: ["title", "price"],
      schema: {
        order: fields.number({ label: "Thứ tự hiển thị", defaultValue: 1 }),
        title: fields.slug({
          name: { label: "Tên tài liệu (VD: Giáo Trình Sáo Trúc Cơ Bản ABC)" },
          slug: { label: "Slug (đường dẫn, không dấu)" },
        }),
        price: fields.number({ label: "Giá (VNĐ)", validation: { isRequired: true } }),
        code: fields.text({ label: "Mã tài liệu (VD: GT_SAOTRUC_CB)" }),
        badge: fields.text({ label: "Nhãn (VD: Bán chạy)" }),
        coverClass: fields.select({
          label: "Kiểu bìa",
          options: [
            { label: "Thường", value: "" },
            { label: "Premium", value: "premium" },
            { label: "Sheet", value: "sheet" },
          ],
          defaultValue: "",
        }),
        coverIcon: fields.select({
          label: "Icon bìa",
          options: [
            { label: "Sách", value: "fa-solid fa-book-open" },
            { label: "Mũ tốt nghiệp", value: "fa-solid fa-graduation-cap" },
            { label: "Nốt nhạc", value: "fa-solid fa-music" },
          ],
          defaultValue: "fa-solid fa-book-open",
        }),
        coverTag: fields.text({ label: "Chữ trên bìa (VD: HỒNG VIỆT)" }),
        desc: fields.text({ label: "Mô tả", multiline: true }),
      },
    }),
    posts: collection({
      label: "Tin tức (Blog)",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Tiêu đề bài viết" },
          slug: { label: "Slug (đường dẫn, không dấu)" },
        }),
        date: fields.date({ label: "Ngày đăng" }),
        excerpt: fields.text({
          label: "Mô tả ngắn (hiển thị ở danh sách)",
          multiline: true,
        }),
        cover: fields.image({
          label: "Ảnh bìa",
          directory: "public/assets/posts",
          publicPath: "/assets/posts/",
        }),
        published: fields.checkbox({ label: "Hiển thị trên trang", defaultValue: true }),
        content: fields.document({
          label: "Nội dung",
          formatting: true,
          links: true,
          dividers: true,
          images: {
            directory: "public/assets/posts",
            publicPath: "/assets/posts/",
          },
          layouts: [[1, 1]],
        }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Cài đặt chung",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        heroTitle: fields.text({ label: "Tiêu đề chính (hero)" }),
        heroAccent: fields.text({ label: "Tiêu đề phụ - chữ vàng (hero)" }),
        heroDescription: fields.text({ label: "Mô tả (hero)", multiline: true }),
        heroBenefits: fields.array(
          fields.object(
            {
              icon: fields.select({ label: "Icon", options: FA_ICONS, defaultValue: "fa-solid fa-music" }),
              text: fields.text({ label: "Nội dung" }),
            },
            { label: "Điểm mạnh" }
          ),
          { label: "Điểm mạnh (hero)", itemLabel: (p) => p.fields.text.value ?? "Điểm mạnh" }
        ),
        phoneRaw: fields.text({ label: "Số điện thoại gọi ra (VD: +84382910471)" }),
        phoneDisplay: fields.text({ label: "Số điện thoại hiển thị (VD: 0382 910 471)" }),
        zalo: fields.text({ label: "Số Zalo (VD: 0382910471)" }),
        socials: fields.array(
          fields.object(
            {
              network: fields.select({
                label: "Mạng xã hội",
                options: [
                  { label: "YouTube", value: "youtube" },
                  { label: "Facebook", value: "facebook" },
                  { label: "TikTok", value: "tiktok" },
                  { label: "Instagram", value: "instagram" },
                ],
                defaultValue: "youtube",
              }),
              handle: fields.text({ label: "Tên hiển thị (handle)" }),
              btn: fields.text({ label: "Nhãn nút (VD: XEM KÊNH)" }),
              href: fields.text({ label: "Đường dẫn (VD: https://youtube.com/...)" }),
            },
            { label: "Mạng xã hội" }
          ),
          { label: "Mạng xã hội", itemLabel: (p) => p.fields.network.value ?? "Mạng xã hội" }
        ),
      },
    }),
    classesPage: singleton({
      label: "Trang Lớp học (LỚP HỌC CÁC BỘ MÔN)",
      path: "content/classesPage",
      format: { data: "yaml" },
      schema: {
        intro: fields.text({ label: "Giới thiệu trang", multiline: true }),
        formats: fields.array(
          fields.object(
            {
              icon: fields.select({ label: "Icon", options: FA_ICONS, defaultValue: "fa-solid fa-house-user" }),
              title: fields.text({ label: "Tiêu đề (VD: GIA SƯ TẠI NHÀ)" }),
              desc: fields.text({ label: "Mô tả" }),
            },
            { label: "Hình thức học" }
          ),
          { label: "Hình thức học", itemLabel: (p) => p.fields.title.value ?? "Hình thức" }
        ),
      },
    }),
  },
});

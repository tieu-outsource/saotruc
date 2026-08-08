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
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "github", repo: "tieu-outsource/saotruc" },
  ui: {
    brand: { name: "Sáo trúc Âu Cơ" },
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
        content: fields.text({ label: "Nội dung (viết tự do)", multiline: true }),
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
        coverTag: fields.text({ label: "Chữ trên bìa (VD: ÂU CƠ)" }),
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
    courses: collection({
      label: "Khóa học quay sẵn (VIDEO COURSES)",
      slugField: "title",
      path: "content/courses/*",
      format: { data: "yaml" },
      columns: ["title", "price"],
      schema: {
        order: fields.number({ label: "Thứ tự hiển thị", defaultValue: 1 }),
        code: fields.text({ label: "Mã khóa học (VD: KH_SAOTRUC_CB)" }),
        title: fields.slug({
          name: { label: "Tên khóa học (VD: Khóa Học Sáo Trúc Cơ Bản ABC)" },
          slug: { label: "Slug (đường dẫn, không dấu)" },
        }),
        price: fields.number({ label: "Giá bán (VNĐ)", validation: { isRequired: true } }),
        badge: fields.text({ label: "Nhãn (VD: Bán chạy nhất, Nâng cao, Hot)" }),
        duration: fields.text({ label: "Thời lượng / Số bài (VD: 20 bài giảng HD)" }),
        desc: fields.text({ label: "Mô tả khóa học", multiline: true }),
        coverIcon: fields.select({
          label: "Icon bìa",
          options: [
            { label: "Laptop", value: "fa-solid fa-laptop" },
            { label: "Mũ tốt nghiệp", value: "fa-solid fa-graduation-cap" },
            { label: "Sách", value: "fa-solid fa-book-open" },
            { label: "Nốt nhạc", value: "fa-solid fa-music" },
            { label: "Ngôi sao", value: "fa-solid fa-star" },
          ],
          defaultValue: "fa-solid fa-laptop",
        }),
        coverTag: fields.text({ label: "Chữ trên bìa (VD: VIDEO COURSE)" }),
      },
    }),
  },
  singletons: {
    settings: singleton({
      label: "Cài đặt chung",
      path: "content/settings",
      format: { data: "yaml" },
      schema: {
        heroSlides: fields.array(
          fields.object(
            {
              image: fields.image({
                label: "Ảnh nền (banner, nên rộng ~1920px)",
                directory: "public/assets/hero",
                publicPath: "/assets/hero/",
              }),
              title: fields.text({ label: "Tiêu đề chính" }),
              accent: fields.text({ label: "Tiêu đề phụ - chữ vàng" }),
              description: fields.text({ label: "Mô tả", multiline: true }),
              primaryLabel: fields.text({ label: "Nhãn nút chính (VD: KHÁM PHÁ DỊCH VỤ)" }),
              primaryHref: fields.text({ label: "Đường dẫn nút chính (VD: #services)" }),
              secondaryLabel: fields.text({ label: "Nhãn nút phụ (VD: TƯ VẤN)" }),
              secondaryHref: fields.text({ label: "Đường dẫn nút phụ (VD: #contact)" }),
            },
            { label: "Slide" }
          ),
          {
            label: "Hero slider (nhiều ảnh + chữ, tự động chuyển)",
            itemLabel: (p) => p.fields.title.value ?? "Slide",
          }
        ),
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
        pinnedPosts: fields.array(
          fields.relationship({ label: "Bài viết ghim", collection: "posts" }),
          { label: "Bài viết ghim trang chủ", itemLabel: (p) => p.value ?? "Bài viết" }
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
        contactTitle: fields.text({ label: "Tiêu đề mục liên hệ (VD: LIÊN HỆ & ĐĂNG KÝ HỌC)" }),
        contactIntro: fields.text({ label: "Mô tả mục liên hệ", multiline: true }),
        contactSubmitLabel: fields.text({ label: "Nhãn nút gửi biểu mẫu (VD: GỬI ĐĂNG KÝ)" }),
        footerMotto: fields.text({ label: "Châm ngôn chân trang (VD: ĐAM MÊ LÀM NÊN GIÁ TRỊ...)" }),
        footerSubtitle: fields.text({ label: "Câu phụ chân trang" }),
        footerCtaLabel: fields.text({ label: "Nhãn nút chân trang (VD: LIÊN HỆ TƯ VẤN)" }),
        footerBottomText: fields.text({
          label: "Nội dung tuỳ chỉnh dưới chân trang (viết tự do: địa chỉ, SĐT, email...)",
          multiline: true,
        }),
        footerCustomFields: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Nhãn (VD: Địa chỉ, Email, SĐT, Giờ làm việc)" }),
              value: fields.text({ label: "Nội dung" }),
            },
            { label: "Thông tin tuỳ chỉnh" }
          ),
          {
            label: "Danh sách thông tin dưới chân trang (địa chỉ, SĐT, email...)",
            itemLabel: (p) => p.fields.label.value ?? "Thông tin",
          }
        ),
        footerCopyright: fields.text({
          label: "Bản quyền (VD: © 2026 Sáo trúc Âu Cơ. Tất cả quyền được bảo lưu.)",
        }),
        bankId: fields.select({
          label: "Mã ngân hàng VietQR (dùng để tạo mã QR thanh toán)",
          options: [
            { label: "VietinBank (ICB)", value: "ICB" },
            { label: "Vietcombank (VCB)", value: "VCB" },
            { label: "BIDV (BIDV)", value: "BIDV" },
            { label: "Agribank (VBA)", value: "VBA" },
            { label: "OCB (OCB)", value: "OCB" },
            { label: "MBBank (MB)", value: "MB" },
            { label: "Techcombank (TCB)", value: "TCB" },
            { label: "ACB (ACB)", value: "ACB" },
            { label: "VPBank (VPB)", value: "VPB" },
            { label: "TPBank (TPB)", value: "TPB" },
            { label: "Sacombank (STB)", value: "STB" },
            { label: "HDBank (HDB)", value: "HDB" },
            { label: "VietCapitalBank (VCCB)", value: "VCCB" },
            { label: "SCB (SCB)", value: "SCB" },
            { label: "VIB (VIB)", value: "VIB" },
            { label: "SHB (SHB)", value: "SHB" },
            { label: "Eximbank (EIB)", value: "EIB" },
            { label: "MSB (MSB)", value: "MSB" },
            { label: "CAKE (CAKE)", value: "CAKE" },
            { label: "Ubank (Ubank)", value: "Ubank" },
            { label: "ViettelMoney (VTLMONEY)", value: "VTLMONEY" },
            { label: "Timo (TIMO)", value: "TIMO" },
            { label: "VNPTMoney (VNPTMONEY)", value: "VNPTMONEY" },
            { label: "SaigonBank (SGICB)", value: "SGICB" },
            { label: "BacABank (BAB)", value: "BAB" },
            { label: "MoMo (momo)", value: "momo" },
            { label: "PVcomBank Pay (PVDB)", value: "PVDB" },
            { label: "PVcomBank (PVCB)", value: "PVCB" },
            { label: "MBV (MBV)", value: "MBV" },
            { label: "NCB (NCB)", value: "NCB" },
            { label: "ShinhanBank (SHBVN)", value: "SHBVN" },
            { label: "ABBANK (ABB)", value: "ABB" },
            { label: "VietABank (VAB)", value: "VAB" },
            { label: "NamABank (NAB)", value: "NAB" },
            { label: "PGBank (PGB)", value: "PGB" },
            { label: "VietBank (VIETBANK)", value: "VIETBANK" },
            { label: "BaoVietBank (BVB)", value: "BVB" },
            { label: "SeABank (SEAB)", value: "SEAB" },
            { label: "COOPBANK (COOPBANK)", value: "COOPBANK" },
            { label: "LPBank (LPB)", value: "LPB" },
            { label: "KienLongBank (KLB)", value: "KLB" },
            { label: "KBank (KBank)", value: "KBank" },
            { label: "MAFC (MAFC)", value: "MAFC" },
            { label: "HongLeong (HLBVN)", value: "HLBVN" },
            { label: "KEBHANAHN (KEBHANAHN)", value: "KEBHANAHN" },
            { label: "KEBHanaHCM (KEBHANAHCM)", value: "KEBHANAHCM" },
            { label: "Citibank (CITIBANK)", value: "CITIBANK" },
            { label: "CBBank (CBB)", value: "CBB" },
            { label: "CIMB (CIMB)", value: "CIMB" },
            { label: "DBSBank (DBS)", value: "DBS" },
            { label: "Vikki (Vikki)", value: "Vikki" },
            { label: "VBSP (VBSP)", value: "VBSP" },
            { label: "GPBank (GPB)", value: "GPB" },
            { label: "KookminHCM (KBHCM)", value: "KBHCM" },
            { label: "KookminHN (KBHN)", value: "KBHN" },
            { label: "Woori (WVN)", value: "WVN" },
            { label: "VRB (VRB)", value: "VRB" },
            { label: "HSBC (HSBC)", value: "HSBC" },
            { label: "IBKHN (IBK - HN)", value: "IBK - HN" },
            { label: "IBKHCM (IBK - HCM)", value: "IBK - HCM" },
            { label: "IndovinaBank (IVB)", value: "IVB" },
            { label: "UnitedOverseas (UOB)", value: "UOB" },
            { label: "Nonghyup (NHB HN)", value: "NHB HN" },
            { label: "StandardChartered (SCVN)", value: "SCVN" },
            { label: "PublicBank (PBVN)", value: "PBVN" },
          ],
          defaultValue: "ICB",
        }),
        bankAccountNo: fields.text({ label: "Số tài khoản ngân hàng (VD: 113366668888)" }),
        bankAccountName: fields.text({ label: "Tên chủ tài khoản (VD: SAO TRUC AU CO)" }),
      },
    }),
    classesPage: singleton({
      label: "Trang Lớp học (LỚP HỌC CÁC BỘ MÔN)",
      path: "content/classesPage",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Tiêu đề trang (VD: LỚP HỌC CÁC BỘ MÔN)" }),
        formatsTitle: fields.text({ label: "Tiêu đề mục hình thức học (VD: HÌNH THỨC HỌC)" }),
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
        ctaLabel: fields.text({ label: "Nhãn nút đăng ký (VD: ĐĂNG KÝ HỌC NGAY)" }),
        ctaHref: fields.text({ label: "Đường dẫn nút đăng ký (VD: /#register)" }),
        seoTitle: fields.text({ label: "Tiêu đề SEO (tab trình duyệt)" }),
        seoDescription: fields.text({ label: "Mô tả SEO", multiline: true }),
      },
    }),
    tailieuPage: singleton({
      label: "Trang Cửa hàng tài liệu (/tailieu)",
      path: "content/tailieuPage",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Tiêu đề trang (VD: CỬA HÀNG TÀI LIỆU)" }),
        intro: fields.text({ label: "Giới thiệu trang", multiline: true }),
        seoTitle: fields.text({ label: "Tiêu đề SEO (tab trình duyệt)" }),
        seoDescription: fields.text({ label: "Mô tả SEO", multiline: true }),
      },
    }),
    tinTucPage: singleton({
      label: "Trang Tin tức (/tin-tuc)",
      path: "content/tinTucPage",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Tiêu đề trang (VD: TIN TỨC)" }),
        intro: fields.text({ label: "Giới thiệu trang", multiline: true }),
        seoTitle: fields.text({ label: "Tiêu đề SEO (tab trình duyệt)" }),
        seoDescription: fields.text({ label: "Mô tả SEO", multiline: true }),
      },
    }),
    saoPage: singleton({
      label: "Trang Bán các loại sáo (/cua-hang-sao)",
      path: "content/saoPage",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Tiêu đề trang (VD: BÁN CÁC LOẠI SÁO & PHỤ KIỆN)" }),
        intro: fields.text({ label: "Giới thiệu trang", multiline: true }),
        items: fields.array(
          fields.object(
            {
              title: fields.text({ label: "Tên loại sáo / sản phẩm (VD: Sáo Trúc Nứa Đô C5 Cao Cấp)" }),
              price: fields.text({ label: "Đơn giá (VD: 350.000đ)" }),
              badge: fields.text({ label: "Nhãn (VD: Bán chạy, Nổi bật, Cao cấp)" }),
              desc: fields.text({ label: "Mô tả sản phẩm", multiline: true }),
              image: fields.image({
                label: "Hình ảnh sản phẩm",
                directory: "public/assets/products",
                publicPath: "/assets/products/",
              }),
              btnLabel: fields.text({ label: "Nhãn nút (VD: TƯ VẤN MUA SÁO)" }),
              btnHref: fields.text({ label: "Đường dẫn nút (VD: /?topic=Tư vấn mua sáo trúc#register)" }),
            },
            { label: "Sản phẩm" }
          ),
          { label: "Danh sách sản phẩm sáo & phụ kiện", itemLabel: (p) => p.fields.title.value ?? "Sản phẩm" }
        ),
        seoTitle: fields.text({ label: "Tiêu đề SEO (tab trình duyệt)" }),
        seoDescription: fields.text({ label: "Mô tả SEO", multiline: true }),
      },
    }),
    khoaHocPage: singleton({
      label: "Trang Khóa học quay sẵn (/khoa-hoc-quay-san)",
      path: "content/khoaHocPage",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Tiêu đề trang (VD: KHÓA HỌC QUAY SẴN)" }),
        intro: fields.text({ label: "Giới thiệu trang", multiline: true }),
        seoTitle: fields.text({ label: "Tiêu đề SEO (tab trình duyệt)" }),
        seoDescription: fields.text({ label: "Mô tả SEO", multiline: true }),
      },
    }),
  },
});

import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import type { SiteSettings } from "./types";

export const reader = createReader(process.cwd(), config);

/**
 * Typed accessors for the Keystatic content. `resolveLinkedFiles: true` makes
 * document fields read eagerly (plain `DocumentElement[]` instead of lazy
 * thunks); asset fields keep returning their filename string either way.
 */
export const cms = {
  services: () => reader.collections.services.all({ resolveLinkedFiles: true }),
  classCards: () => reader.collections.classCards.all({ resolveLinkedFiles: true }),
  storeItems: () => reader.collections.storeItems.all({ resolveLinkedFiles: true }),
  posts: () => reader.collections.posts.all({ resolveLinkedFiles: true }),
  post: (slug: string) =>
    reader.collections.posts.read(slug, { resolveLinkedFiles: true }),
  settings: () => reader.singletons.settings.read({ resolveLinkedFiles: true }),
  classesPage: () => reader.singletons.classesPage.read({ resolveLinkedFiles: true }),
  tailieuPage: () => reader.singletons.tailieuPage.read({ resolveLinkedFiles: true }),
  tinTucPage: () => reader.singletons.tinTucPage.read({ resolveLinkedFiles: true }),
  /** Site-wide text: contact info for the modal + footer/form copy, with hardcoded-site fallbacks. */
  siteSettings: async (): Promise<SiteSettings> => {
    const s = await reader.singletons.settings.read({ resolveLinkedFiles: true });
    return {
      phoneRaw: s?.phoneRaw ?? "0382910471",
      phoneDisplay: s?.phoneDisplay ?? "0382 910 471",
      zalo: s?.zalo ?? "0382910471",
      socials: (s?.socials ?? []).map((x) => ({
        network: x.network,
        handle: x.handle ?? "",
        btn: x.btn ?? "",
        href: x.href ?? "",
      })),
      footerMotto: s?.footerMotto ?? "ĐAM MÊ LÀM NÊN GIÁ TRỊ - CHẤT LƯỢNG TẠO NÊN UY TÍN",
      footerSubtitle: s?.footerSubtitle ?? "Đồng hành cùng bạn trên hành trình chạm đến âm nhạc truyền thống.",
      footerCtaLabel: s?.footerCtaLabel ?? "LIÊN HỆ TƯ VẤN",
      contactTitle: s?.contactTitle ?? "LIÊN HỆ & ĐĂNG KÝ HỌC",
      contactIntro: s?.contactIntro ?? "Để lại thông tin, Hồng Việt sẽ liên hệ tư vấn khóa học, mua sáo, tài liệu hoặc dịch vụ thu âm, biểu diễn trong thời gian sớm nhất.",
      contactSubmitLabel: s?.contactSubmitLabel ?? "GỬI ĐĂNG KÝ",
    };
  },
};

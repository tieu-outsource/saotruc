import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import type { ContactSettings } from "./types";

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
  /** Contact info for the footer modal, with hardcoded-site fallbacks. */
  contactSettings: async (): Promise<ContactSettings> => {
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
    };
  },
};

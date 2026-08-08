export type NetworkMeta = {
  platform: string;
  className: string;
  icon: string;
};

/** Mạng xã hội → nhãn + className + icon (dùng ở Socials và ContactModal). */
export const NETWORK_META: Record<string, NetworkMeta> = {
  youtube: { platform: "YouTube", className: "youtube", icon: "fa-brands fa-youtube" },
  facebook: { platform: "Fanpage Facebook", className: "facebook", icon: "fa-brands fa-facebook-f" },
  tiktok: { platform: "TikTok", className: "tiktok", icon: "fa-brands fa-tiktok" },
  instagram: { platform: "Instagram", className: "instagram", icon: "fa-brands fa-instagram" },
};

export function socialLink(network: string): NetworkMeta {
  return NETWORK_META[network] ?? { platform: network, className: "", icon: "fa-solid fa-link" };
}

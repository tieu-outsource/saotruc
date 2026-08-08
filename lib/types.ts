export type PinnedPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string | null;
  date: string | null;
};

export type SocialLink = {
  network: string;
  handle: string;
  btn: string;
  href: string;
};
export type FooterCustomField = {
  label: string;
  value: string;
};

export type SiteSettings = {
  phoneRaw: string;
  phoneDisplay: string;
  zalo: string;
  socials: SocialLink[];
  footerMotto: string;
  footerSubtitle: string;
  footerCtaLabel: string;
  footerBottomText?: string;
  footerCustomFields?: FooterCustomField[];
  footerCopyright?: string;
  contactTitle: string;
  contactIntro: string;
  contactSubmitLabel: string;
  pinnedPosts: PinnedPost[];
};

export type DocumentItem = {
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
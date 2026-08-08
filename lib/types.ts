export type SocialLink = {
  network: string;
  handle: string;
  btn: string;
  href: string;
};

export type ContactSettings = {
  phoneRaw: string;
  phoneDisplay: string;
  zalo: string;
  socials: SocialLink[];
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

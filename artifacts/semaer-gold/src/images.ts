// Photographic slots of the SAER GOLD site.
// Every file lives in `public/images` and is cropped from the house's own
// campaign photograph so each existing slot keeps its layout and framing.

export type SiteImage = {
  src: string;
  /** Narrow-screen crop used by the hero on phones and tablets. */
  mobile?: string;
  alt: { fr: string; en: string };
};

export const siteImages = {
  hero: {
    src: '/images/hero-desktop.webp',
    mobile: '/images/hero-mobile.webp',
    alt: {
      fr: 'Parure SAER GOLD : collier à pendentifs goutte en or texturé présenté sur un buste de velours noir.',
      en: 'SAER GOLD parure: textured gold teardrop pendant necklace displayed on a black velvet bust.',
    },
  },
  maison: {
    src: '/images/maison.webp',
    mobile: '/images/maison-mobile.webp',
    alt: {
      fr: 'Emblème et signature SAER GOLD, le prince des bijoutiers.',
      en: 'SAER GOLD emblem and signature, the prince of jewelers.',
    },
  },
  collectionNecklace: {
    src: '/images/collection-tall.webp',
    alt: {
      fr: 'Détail du collier SAER GOLD : rangs de pendentifs goutte en or granuleux.',
      en: 'SAER GOLD necklace detail: rows of granular gold teardrop pendants.',
    },
  },
  collectionEarring: {
    src: '/images/collection-small.webp',
    alt: {
      fr: "Boucle d'oreille SAER GOLD à trois pendentifs goutte en or texturé.",
      en: 'SAER GOLD earring with three textured gold teardrop pendants.',
    },
  },
  collectionEarrings: {
    src: '/images/collection-wide.webp',
    alt: {
      fr: "Boucles d'oreilles SAER GOLD assorties au collier de la maison.",
      en: 'SAER GOLD earrings matching the house necklace.',
    },
  },
  creationMain: {
    src: '/images/creation-main.webp',
    alt: {
      fr: 'Collier SAER GOLD à trois rangs de pendentifs goutte en or texturé.',
      en: 'SAER GOLD necklace with three rows of textured gold teardrop pendants.',
    },
  },
  creationMacro: {
    src: '/images/creation-macro.webp',
    alt: {
      fr: "Macro d'une boucle d'oreille SAER GOLD sur son présentoir de velours noir.",
      en: 'Macro of a SAER GOLD earring on its black velvet display.',
    },
  },
  creationCampaign: {
    src: '/images/creation-campaign.webp',
    alt: {
      fr: 'Campagne SAER GOLD : la signature de la maison entre le collier et les boucles d’oreilles.',
      en: 'SAER GOLD campaign: the house signature between the necklace and the earrings.',
    },
  },
  craftMain: {
    src: '/images/craft-main.webp',
    alt: {
      fr: 'Savoir-faire SAER GOLD : or granuleux et pendentifs goutte façonnés un à un.',
      en: 'SAER GOLD craftsmanship: granular gold and teardrop pendants shaped one by one.',
    },
  },
  craftDetail: {
    src: '/images/creation-macro.webp',
    alt: {
      fr: "Détail de finition d'une boucle d'oreille SAER GOLD.",
      en: 'Finishing detail of a SAER GOLD earring.',
    },
  },
  factoryInspiration: {
    src: '/images/factory-01.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Inspiration : lumière et reflets sur le velours.',
      en: 'SAER GOLD FACTORY — Inspiration: light and reflections on velvet.',
    },
  },
  factoryVision: {
    src: '/images/factory-02.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Vision créative : premier rang de pendentifs du collier.',
      en: 'SAER GOLD FACTORY — Creative vision: first row of necklace pendants.',
    },
  },
  factoryDesign: {
    src: '/images/factory-03.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Design : équilibre des rangs de pendentifs goutte.',
      en: 'SAER GOLD FACTORY — Design: balance of the teardrop pendant rows.',
    },
  },
  factoryMaking: {
    src: '/images/factory-04.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Making of : or texturé et granulation.',
      en: 'SAER GOLD FACTORY — Making of: textured gold and granulation.',
    },
  },
  factoryDetails: {
    src: '/images/collection-wide.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Détails et finitions : boucles d’oreilles sur velours.',
      en: 'SAER GOLD FACTORY — Details and finishing: earrings on velvet.',
    },
  },
  factoryMasterpiece: {
    src: '/images/maison.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — Le chef-d’œuvre final : emblème de la maison.',
      en: 'SAER GOLD FACTORY — The final masterpiece: the house emblem.',
    },
  },
  factoryOverview: {
    src: '/images/factory-wide.webp',
    alt: {
      fr: 'SAER GOLD FACTORY — vue d’ensemble de la parure sur velours noir.',
      en: 'SAER GOLD FACTORY — overview of the parure on black velvet.',
    },
  },
  socialCampaign: {
    src: '/images/social-campaign.webp',
    alt: {
      fr: 'Campagne SAER GOLD — signature de la maison, collier et boucles d’oreilles.',
      en: 'SAER GOLD campaign — house signature, necklace and earrings.',
    },
  },
  socialEarrings: {
    src: '/images/social-earrings.webp',
    alt: {
      fr: 'Parure SAER GOLD — boucles d’oreilles et reflets sur velours noir.',
      en: 'SAER GOLD parure — earrings and reflections on black velvet.',
    },
  },
  visit: {
    src: '/images/visit.webp',
    alt: {
      fr: 'Le collier SAER GOLD présenté dans la maison, à Dakar.',
      en: 'The SAER GOLD necklace presented in the house, in Dakar.',
    },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof siteImages;

export function imageAlt(key: ImageKey, language: 'FR' | 'WO' | 'EN') {
  return siteImages[key].alt[language === 'EN' ? 'en' : 'fr'];
}

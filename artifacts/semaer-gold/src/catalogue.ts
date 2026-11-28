import type { Language } from './content';

/**
 * Catalogue SAER GOLD — contenu et emplacements photographiques.
 *
 * Pour ajouter une photographie : déposer le fichier dans
 * `artifacts/semaer-gold/public/catalogue/` puis renseigner son chemin
 * ci-dessous (ex. `/catalogue/banniere-editoriale.jpg`).
 *
 * Tant qu'un chemin est vide, un emplacement réservé élégant est affiché.
 * Aucun visuel générique ni produit fictif n'est utilisé.
 */

export type CatalogueText = { fr: string; wo?: string; en: string };

export type CatalogueCategoryId = 'bagues' | 'colliers' | 'bracelets' | 'boucles' | 'parures';

export type CatalogueTone = 'ivory' | 'sand' | 'anthracite';

export type CatalogueCategory = {
  id: CatalogueCategoryId;
  name: CatalogueText;
  /** Chemin public de la photographie officielle de la collection. */
  image?: string;
  tone: CatalogueTone;
};

export type CatalogueProduct = {
  id: string;
  category: CatalogueCategoryId;
  name: CatalogueText;
  /** Chemin public de la photographie officielle du bijou. */
  image?: string;
  /** Affiché uniquement lorsque la maison a communiqué le prix. */
  price?: string;
  description?: CatalogueText;
};

export type CatalogueProductSlot = {
  id: string;
  category: CatalogueCategoryId;
  tone: CatalogueTone;
};

export function catalogueText(entry: CatalogueText, language: Language) {
  if (language === 'WO') return entry.wo || entry.fr;
  return language === 'EN' ? entry.en : entry.fr;
}

export type CatalogueLines = { fr: string[]; wo?: string[]; en: string[] };

export function catalogueLines(entry: CatalogueLines, language: Language) {
  if (language === 'WO') return entry.wo?.length ? entry.wo : entry.fr;
  return language === 'EN' ? entry.en : entry.fr;
}

export const catalogueHero = {
  eyebrow: { fr: 'Catalogue · Nos collections', wo: '', en: 'Catalogue · Our collections' },
  titleLines: {
    fr: ['L’ÉLÉGANCE', 'DANS CHAQUE', 'DÉTAIL'],
    wo: ['L’ÉLÉGANCE', 'DANS CHAQUE', 'DÉTAIL'],
    en: ['ELEGANCE', 'IN EVERY', 'DETAIL'],
  },
  intro: {
    fr: 'Découvrez des créations pensées pour révéler votre élégance. Des bijoux qui traversent les tendances et racontent votre histoire.',
    wo: '',
    en: 'Discover creations designed to reveal your elegance. Jewels that transcend trends and tell your story.',
  },
  explore: { fr: 'Explorer les collections', wo: '', en: 'Explore the collections' },
  order: { fr: 'Commander une création', wo: '', en: 'Order a creation' },
  mediaLabel: {
    fr: 'Bannière éditoriale — photographie officielle à ajouter',
    wo: '',
    en: 'Editorial banner — official photograph to be added',
  },
  foot: { fr: 'Le prince des bijoutiers', wo: '', en: 'The prince of jewelers' },
};

export const catalogueImages = {
  /** Grande bannière éditoriale (format portrait 4/5). */
  hero: '',
  /** Mise en scène éditoriale (format portrait 3/4). */
  editorialScene: '',
  /** Détail macro du bijou (format carré). */
  editorialDetail: '',
};

export const catalogueCategories: CatalogueCategory[] = [
  { id: 'bagues', name: { fr: 'Bagues', wo: '', en: 'Rings' }, image: '', tone: 'sand' },
  { id: 'colliers', name: { fr: 'Colliers', wo: '', en: 'Necklaces' }, image: '', tone: 'ivory' },
  { id: 'bracelets', name: { fr: 'Bracelets', wo: '', en: 'Bracelets' }, image: '', tone: 'anthracite' },
  { id: 'boucles', name: { fr: 'Boucles d’oreilles', wo: '', en: 'Earrings' }, image: '', tone: 'ivory' },
  { id: 'parures', name: { fr: 'Parures', wo: '', en: 'Sets' }, image: '', tone: 'sand' },
];

/**
 * Créations réelles de la maison. La liste reste vide tant que SAER GOLD
 * n'a pas fourni les photographies et informations officielles : la grille
 * affiche alors des emplacements réservés, jamais de produit inventé.
 */
export const catalogueProducts: CatalogueProduct[] = [];

/** Emplacements réservés aux futures fiches produits (aucun nom inventé). */
export const catalogueProductSlots: CatalogueProductSlot[] = [
  { id: 'bagues-1', category: 'bagues', tone: 'ivory' },
  { id: 'colliers-1', category: 'colliers', tone: 'sand' },
  { id: 'bracelets-1', category: 'bracelets', tone: 'ivory' },
  { id: 'boucles-1', category: 'boucles', tone: 'sand' },
  { id: 'parures-1', category: 'parures', tone: 'ivory' },
  { id: 'bagues-2', category: 'bagues', tone: 'sand' },
  { id: 'colliers-2', category: 'colliers', tone: 'ivory' },
  { id: 'bracelets-2', category: 'bracelets', tone: 'sand' },
  { id: 'boucles-2', category: 'boucles', tone: 'ivory' },
];

export const catalogueCopy = {
  collectionsEyebrow: { fr: 'Les collections', wo: '', en: 'The collections' },
  collectionsTitle: { fr: 'Nos collections', wo: '', en: 'Our collections' },
  collectionsNote: {
    fr: 'Cinq familles de créations, réunies dans un même écrin.',
    wo: '',
    en: 'Five families of creations, gathered in a single case.',
  },
  discover: { fr: 'Découvrir', wo: '', en: 'Discover' },
  creationsEyebrow: { fr: 'Les créations', wo: '', en: 'The creations' },
  creationsTitle: { fr: 'Pièces de la maison', wo: '', en: 'Pieces of the house' },
  creationsNote: {
    fr: 'Chaque création sera présentée avec sa photographie officielle, son nom et son prix lorsqu’ils sont communiqués par la maison.',
    wo: '',
    en: 'Each creation will be presented with its official photograph, name and price once provided by the house.',
  },
  filterAll: { fr: 'Toutes', wo: '', en: 'All' },
  filterLabel: { fr: 'Filtrer les créations par collection', wo: '', en: 'Filter creations by collection' },
  reservedLabel: { fr: 'Emplacement réservé', wo: '', en: 'Reserved space' },
  reservedNote: {
    fr: 'Photographie officielle à ajouter.',
    wo: '',
    en: 'Official photograph to be added.',
  },
  emptyCollection: {
    fr: 'Cette collection sera présentée prochainement.',
    wo: '',
    en: 'This collection will be presented soon.',
  },
  discoverCreation: { fr: 'Découvrir la création', wo: '', en: 'Discover the creation' },
  close: { fr: 'Fermer', wo: '', en: 'Close' },
  editorialEyebrow: { fr: 'Mise en scène', wo: '', en: 'Art direction' },
  editorialQuote: {
    fr: 'Des bijoux qui traversent les tendances et racontent votre histoire.',
    wo: '',
    en: 'Jewels that transcend trends and tell your story.',
  },
  editorialNote: {
    fr: 'Compositions éditoriales sur socles beige et champagne, réservées aux photographies officielles SAER GOLD.',
    wo: '',
    en: 'Editorial compositions on beige and champagne stands, reserved for official SAER GOLD photographs.',
  },
  editorialSceneLabel: {
    fr: 'Mise en scène éditoriale — photographie officielle à ajouter',
    wo: '',
    en: 'Editorial scene — official photograph to be added',
  },
  editorialDetailLabel: {
    fr: 'Détail macro — photographie officielle à ajouter',
    wo: '',
    en: 'Macro detail — official photograph to be added',
  },
  editorialCaption: { fr: 'Univers de la maison', wo: '', en: 'World of the house' },
  orderEyebrow: { fr: 'Commande & contact', wo: '', en: 'Orders & contact' },
  orderTitle: { fr: 'Une création vous intéresse ?', wo: '', en: 'Interested in a creation?' },
  orderIntro: {
    fr: 'Contactez la maison pour connaître les pièces disponibles et passer commande.',
    wo: '',
    en: 'Contact the house to learn about available pieces and place an order.',
  },
  orderContact: { fr: 'Nous contacter', wo: '', en: 'Contact us' },
  orderPhones: { fr: 'Nous joindre', wo: '', en: 'Call us' },
  orderAddress: { fr: 'La maison', wo: '', en: 'The house' },
  metaTitle: { fr: 'Catalogue — SAER GOLD', wo: '', en: 'Catalogue — SAER GOLD' },
  metaDescription: {
    fr: 'Catalogue des collections SAER GOLD : bagues, colliers, bracelets, boucles d’oreilles et parures.',
    wo: '',
    en: 'SAER GOLD collections catalogue: rings, necklaces, bracelets, earrings and sets.',
  },
} satisfies Record<string, CatalogueText>;

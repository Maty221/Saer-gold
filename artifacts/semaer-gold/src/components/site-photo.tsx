import { imageAlt, siteImages, type ImageKey, type SiteImage } from '../images';
import type { Language } from '../content';

type SitePhotoProps = {
  image: ImageKey;
  language: Language;
  className?: string;
  /** Above-the-fold photography loads immediately. */
  priority?: boolean;
};

/**
 * Fills one of the site's existing photographic slots with the house image.
 * The wrapper keeps the layout class of the slot it replaces.
 */
export function SitePhoto({ image, language, className = '', priority = false }: SitePhotoProps) {
  const asset: SiteImage = siteImages[image];
  return <div className={`image-placeholder photo-frame ${className}`.trim()}>
    <picture>
      {asset.mobile && <source media="(max-width: 767px)" srcSet={asset.mobile} />}
      <img
        src={asset.src}
        alt={imageAlt(image, language)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  </div>;
}

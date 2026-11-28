import type { ReactNode } from 'react';
import type { CatalogueTone } from '../../catalogue';

type PhotoFrameProps = {
  image?: string;
  alt: string;
  label: string;
  tone?: CatalogueTone;
  ratio?: string;
  contain?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Cadre photographique unique du catalogue.
 * - affiche la photographie réelle en respectant ses proportions (jamais déformée) ;
 * - sinon, affiche un emplacement réservé discret, harmonisé à la palette.
 */
export function PhotoFrame({
  image,
  alt,
  label,
  tone = 'sand',
  ratio = '4 / 5',
  contain = false,
  className = '',
  children,
}: PhotoFrameProps) {
  return (
    <div className={`cat-frame cat-frame--${tone} ${className}`} style={{ aspectRatio: ratio }}>
      {image ? (
        <img
          className={`cat-frame-img ${contain ? 'is-contained' : ''}`}
          src={image}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="cat-frame-empty" role="img" aria-label={label}>
          <span className="cat-frame-mark serif" aria-hidden="true">S<span>.</span></span>
          <span className="cat-frame-label">{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

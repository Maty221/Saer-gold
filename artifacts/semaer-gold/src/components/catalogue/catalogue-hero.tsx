import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Language } from '../../content';
import { catalogueHero, catalogueImages, catalogueLines, catalogueText } from '../../catalogue';
import { PhotoFrame } from './photo-frame';

export function CatalogueHero({ language }: { language: Language }) {
  const lines = catalogueLines(catalogueHero.titleLines, language);

  return (
    <section className="cat-hero" aria-labelledby="catalogue-title">
      <div className="cat-hero-grid">
        <div className="cat-hero-copy">
          <div className="cat-kicker eyebrow">
            <span className="gold-rule" />
            {catalogueText(catalogueHero.eyebrow, language)}
          </div>
          <h1 id="catalogue-title" className="cat-hero-title serif" aria-label={lines.join(' ')}>
            {lines.map((line, index) => (
              <span
                key={line}
                className={index === lines.length - 1 ? 'cat-hero-title-accent' : undefined}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="cat-hero-intro">{catalogueText(catalogueHero.intro, language)}</p>
          <div className="cat-hero-actions">
            <a className="gold-button" href="#collections">
              {catalogueText(catalogueHero.explore, language)} <ArrowDown size={14} aria-hidden="true" />
            </a>
            <a className="cat-hero-link" href="#commande">
              {catalogueText(catalogueHero.order, language)} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="cat-hero-media">
          <PhotoFrame
            image={catalogueImages.hero || undefined}
            alt={catalogueText(catalogueHero.mediaLabel, language)}
            label={catalogueText(catalogueHero.mediaLabel, language)}
            tone="sand"
            ratio="4 / 5"
          />
          <div className="cat-hero-caption">
            <span>SAER GOLD</span>
            <span>DAKAR · SÉNÉGAL</span>
          </div>
        </div>
      </div>

      <div className="cat-hero-foot">
        <span className="cat-hero-monogram serif" aria-hidden="true">S.</span>
        <span className="cat-hero-foot-rule" />
        <span>{catalogueText(catalogueHero.foot, language)}</span>
        <span className="cat-hero-foot-index">CATALOGUE · 2026</span>
      </div>
    </section>
  );
}

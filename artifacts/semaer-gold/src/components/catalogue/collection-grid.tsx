import { ArrowUpRight } from 'lucide-react';
import type { Language } from '../../content';
import {
  catalogueCategories,
  catalogueCopy,
  catalogueText,
  type CatalogueCategoryId,
} from '../../catalogue';
import { PhotoFrame } from './photo-frame';

type CollectionGridProps = {
  language: Language;
  onSelect: (category: CatalogueCategoryId) => void;
};

export function CollectionGrid({ language, onSelect }: CollectionGridProps) {
  return (
    <section className="cat-collections" id="collections" aria-labelledby="catalogue-collections-title">
      <div className="cat-section-head">
        <div>
          <div className="cat-kicker eyebrow">
            <span className="gold-rule" />
            {catalogueText(catalogueCopy.collectionsEyebrow, language)}
          </div>
          <h2 id="catalogue-collections-title" className="serif">
            {catalogueText(catalogueCopy.collectionsTitle, language)}
          </h2>
        </div>
        <p>{catalogueText(catalogueCopy.collectionsNote, language)}</p>
      </div>

      <div className="cat-collection-grid">
        {catalogueCategories.map((category, index) => {
          const name = catalogueText(category.name, language);
          return (
            <a
              key={category.id}
              className={`cat-collection-tile cat-collection-tile--${index + 1}`}
              href="#creations"
              onClick={() => onSelect(category.id)}
            >
              <PhotoFrame
                image={category.image || undefined}
                alt={name}
                label={`${name} — ${catalogueText(catalogueCopy.reservedNote, language)}`}
                tone={category.tone}
                ratio={index === 0 ? '4 / 5' : '3 / 4'}
              />
              <div className="cat-collection-caption">
                <span className="cat-collection-index serif">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="serif">{name}</h3>
                <span className="cat-collection-link">
                  {catalogueText(catalogueCopy.discover, language)} <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

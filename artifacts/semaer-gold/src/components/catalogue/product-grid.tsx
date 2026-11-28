import { useEffect, type ReactNode } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Link } from 'wouter';
import type { Language } from '../../content';
import {
  catalogueCategories,
  catalogueCopy,
  catalogueProducts,
  catalogueProductSlots,
  catalogueText,
  type CatalogueCategoryId,
  type CatalogueProduct,
} from '../../catalogue';
import { PhotoFrame } from './photo-frame';

export type CategoryFilter = CatalogueCategoryId | 'all';

type ProductGridProps = {
  language: Language;
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  selectedProduct: CatalogueProduct | null;
  onSelectProduct: (product: CatalogueProduct | null) => void;
  whatsappAction: ReactNode;
};

function categoryName(id: CatalogueCategoryId, language: Language) {
  const category = catalogueCategories.find((entry) => entry.id === id);
  return category ? catalogueText(category.name, language) : '';
}

export function ProductGrid({
  language,
  activeCategory,
  onCategoryChange,
  selectedProduct,
  onSelectProduct,
  whatsappAction,
}: ProductGridProps) {
  const hasProducts = catalogueProducts.length > 0;
  const filteredProducts = activeCategory === 'all'
    ? catalogueProducts
    : catalogueProducts.filter((product) => product.category === activeCategory);
  const filteredSlots = activeCategory === 'all'
    ? catalogueProductSlots
    : catalogueProductSlots.filter((slot) => slot.category === activeCategory);

  return (
    <section className="cat-creations" id="creations" aria-labelledby="catalogue-creations-title">
      <div className="cat-section-head cat-section-head--creations">
        <div>
          <div className="cat-kicker eyebrow">
            <span className="gold-rule" />
            {catalogueText(catalogueCopy.creationsEyebrow, language)}
          </div>
          <h2 id="catalogue-creations-title" className="serif">
            {catalogueText(catalogueCopy.creationsTitle, language)}
          </h2>
        </div>
        <p>{catalogueText(catalogueCopy.creationsNote, language)}</p>
      </div>

      <div className="cat-filters" role="group" aria-label={catalogueText(catalogueCopy.filterLabel, language)}>
        <button
          type="button"
          className="cat-filter"
          aria-pressed={activeCategory === 'all'}
          onClick={() => onCategoryChange('all')}
        >
          {catalogueText(catalogueCopy.filterAll, language)}
        </button>
        {catalogueCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="cat-filter"
            aria-pressed={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {catalogueText(category.name, language)}
          </button>
        ))}
      </div>

      {hasProducts && filteredProducts.length === 0 ? (
        <p className="cat-empty">{catalogueText(catalogueCopy.emptyCollection, language)}</p>
      ) : (
        <div className="cat-product-grid">
          {hasProducts
            ? filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  onOpen={() => onSelectProduct(product)}
                />
              ))
            : filteredSlots.map((slot) => (
                <article className="cat-product-card is-reserved" key={slot.id}>
                  <PhotoFrame
                    alt={`${categoryName(slot.category, language)} — ${catalogueText(catalogueCopy.reservedLabel, language)}`}
                    label={catalogueText(catalogueCopy.reservedLabel, language)}
                    tone={slot.tone}
                    ratio="4 / 5"
                  />
                  <div className="cat-product-meta">
                    <span className="cat-product-category eyebrow">{categoryName(slot.category, language)}</span>
                    <span className="cat-product-reserved">{catalogueText(catalogueCopy.reservedNote, language)}</span>
                  </div>
                </article>
              ))}
        </div>
      )}

      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          language={language}
          onClose={() => onSelectProduct(null)}
          whatsappAction={whatsappAction}
        />
      )}
    </section>
  );
}

function ProductCard({
  product,
  language,
  onOpen,
}: {
  product: CatalogueProduct;
  language: Language;
  onOpen: () => void;
}) {
  const name = catalogueText(product.name, language);

  return (
    <article className="cat-product-card">
      <button type="button" className="cat-product-media" onClick={onOpen} aria-label={`${catalogueText(catalogueCopy.discoverCreation, language)} — ${name}`}>
        <PhotoFrame
          image={product.image || undefined}
          alt={name}
          label={name}
          tone="ivory"
          ratio="4 / 5"
          contain
        />
      </button>
      <div className="cat-product-meta">
        <span className="cat-product-category eyebrow">{categoryName(product.category, language)}</span>
        <h3 className="serif">{name}</h3>
        {product.price && <span className="cat-product-price">{product.price}</span>}
        <button type="button" className="cat-product-link" onClick={onOpen}>
          {catalogueText(catalogueCopy.discoverCreation, language)} <ArrowUpRight size={13} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function ProductDialog({
  product,
  language,
  onClose,
  whatsappAction,
}: {
  product: CatalogueProduct;
  language: Language;
  onClose: () => void;
  whatsappAction: ReactNode;
}) {
  const name = catalogueText(product.name, language);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="cat-dialog" role="presentation" onClick={onClose}>
      <div
        className="cat-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cat-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="cat-dialog-close" onClick={onClose} aria-label={catalogueText(catalogueCopy.close, language)} autoFocus>
          <X size={18} aria-hidden="true" />
        </button>
        <div className="cat-dialog-media">
          <PhotoFrame
            image={product.image || undefined}
            alt={name}
            label={name}
            tone="ivory"
            ratio="4 / 5"
            contain
          />
        </div>
        <div className="cat-dialog-copy">
          <span className="eyebrow">{categoryName(product.category, language)}</span>
          <h2 id="cat-dialog-title" className="serif">{name}</h2>
          {product.price && <p className="cat-dialog-price">{product.price}</p>}
          {product.description && <p className="cat-dialog-description">{catalogueText(product.description, language)}</p>}
          <div className="cat-dialog-actions">
            {whatsappAction}
            <Link className="cat-outline-dark" href="/contact">
              {catalogueText(catalogueCopy.orderContact, language)} <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../content';
import { catalogueCopy, catalogueText, type CatalogueProduct } from '../catalogue';
import { useMetadata } from '../lib/metadata';
import { CatalogueHero } from '../components/catalogue/catalogue-hero';
import { CollectionGrid } from '../components/catalogue/collection-grid';
import { ProductGrid, type CategoryFilter } from '../components/catalogue/product-grid';
import { EditorialScene } from '../components/catalogue/editorial-scene';
import { OrderSection } from '../components/catalogue/order-section';
import '../catalogue.css';

export function CataloguePage({
  language,
  whatsappAction,
}: {
  language: Language;
  whatsappAction: ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);

  useMetadata(
    catalogueText(catalogueCopy.metaTitle, language),
    catalogueText(catalogueCopy.metaDescription, language),
  );

  return (
    <main className="catalogue-page">
      <CatalogueHero language={language} />
      <CollectionGrid language={language} onSelect={setActiveCategory} />
      <ProductGrid
        language={language}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        selectedProduct={selectedProduct}
        onSelectProduct={setSelectedProduct}
        whatsappAction={whatsappAction}
      />
      <EditorialScene language={language} />
      <OrderSection language={language} whatsappAction={whatsappAction} />
    </main>
  );
}

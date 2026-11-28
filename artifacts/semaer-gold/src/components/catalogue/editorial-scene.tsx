import type { Language } from '../../content';
import { catalogueCopy, catalogueImages, catalogueText } from '../../catalogue';
import { PhotoFrame } from './photo-frame';

export function EditorialScene({ language }: { language: Language }) {
  return (
    <section className="cat-editorial" aria-labelledby="cat-editorial-title">
      <div className="cat-editorial-copy">
        <div className="cat-kicker eyebrow">
          <span className="gold-rule" />
          {catalogueText(catalogueCopy.editorialEyebrow, language)}
        </div>
        <h2 id="cat-editorial-title" className="serif">
          {catalogueText(catalogueCopy.editorialQuote, language)}
        </h2>
        <p>{catalogueText(catalogueCopy.editorialNote, language)}</p>
      </div>

      <div className="cat-editorial-media">
        <PhotoFrame
          className="cat-editorial-main"
          image={catalogueImages.editorialScene || undefined}
          alt={catalogueText(catalogueCopy.editorialSceneLabel, language)}
          label={catalogueText(catalogueCopy.editorialSceneLabel, language)}
          tone="anthracite"
          ratio="3 / 4"
        />
        <PhotoFrame
          className="cat-editorial-detail"
          image={catalogueImages.editorialDetail || undefined}
          alt={catalogueText(catalogueCopy.editorialDetailLabel, language)}
          label={catalogueText(catalogueCopy.editorialDetailLabel, language)}
          tone="sand"
          ratio="1 / 1"
        />
        <div className="cat-editorial-caption">
          <span className="serif">S.</span>
          <span>{catalogueText(catalogueCopy.editorialCaption, language)}</span>
        </div>
      </div>
    </section>
  );
}

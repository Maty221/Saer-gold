import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { contactConfig, text, type Language } from '../../content';
import { catalogueCopy, catalogueText } from '../../catalogue';

export function OrderSection({
  language,
  whatsappAction,
}: {
  language: Language;
  whatsappAction: ReactNode;
}) {
  return (
    <section className="cat-order" id="commande" aria-labelledby="cat-order-title">
      <div className="cat-order-inner">
        <div className="cat-order-copy">
          <div className="cat-kicker eyebrow">
            <span className="gold-rule" />
            {catalogueText(catalogueCopy.orderEyebrow, language)}
          </div>
          <h2 id="cat-order-title" className="serif">
            {catalogueText(catalogueCopy.orderTitle, language)}
          </h2>
          <p>{catalogueText(catalogueCopy.orderIntro, language)}</p>
          <div className="cat-order-actions">
            {whatsappAction}
            <Link className="cat-outline-dark" href="/contact">
              {catalogueText(catalogueCopy.orderContact, language)} <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="cat-order-details">
          <span className="eyebrow cat-order-label">{catalogueText(catalogueCopy.orderPhones, language)}</span>
          <div className="cat-order-phones">
            {contactConfig.phones.map((phone) => (
              <a key={phone.tel} href={`tel:${phone.tel}`}>
                {phone.display} <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
          <span className="eyebrow cat-order-label">{catalogueText(catalogueCopy.orderAddress, language)}</span>
          <p className="cat-order-address">{text('address', language)}</p>
        </div>
      </div>
    </section>
  );
}

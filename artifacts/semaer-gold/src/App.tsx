import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Compass, Globe2, MapPin, Menu, MessageCircle, Navigation, Quote, Share2, X } from 'lucide-react';
import { SiFacebook, SiInstagram, SiTiktok } from 'react-icons/si';
import { brandConfig, contactConfig, creationStoryTemplate, text, type CopyKey, type Language } from './content';

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void } | null>(null);
const languageOptions: { value: Language; flag: string; short: string; label: string }[] = [
  { value: 'FR', flag: '🇫🇷', short: 'FR', label: 'Français' },
  { value: 'EN', flag: '🇬🇧', short: 'EN', label: 'English' },
  { value: 'WO', flag: '🇸🇳', short: 'WO', label: 'Wolof' },
];
const socialIcons = { instagram: SiInstagram, facebook: SiFacebook, tiktok: SiTiktok };
const socialLabelKeys = {
  instagram: 'socialInstagram',
  facebook: 'socialFacebook',
  tiktok: 'socialTikTok',
} as const;
const factoryChapterKeys = [
  'factoryChapterInspiration',
  'factoryChapterVision',
  'factoryChapterDesign',
  'factoryChapterMaking',
  'factoryChapterDetails',
  'factoryChapterMasterpiece',
] as const;
const creationDetailFields: { key: keyof typeof creationStoryTemplate; label: CopyKey }[] = [
  { key: 'summary', label: 'summary' },
  { key: 'history', label: 'history' },
  { key: 'shortDescription', label: 'shortDescription' },
  { key: 'inspiration', label: 'inspiration' },
  { key: 'symbolism', label: 'symbolism' },
  { key: 'craftsmanship', label: 'craftsmanship' },
];

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('LanguageContext is unavailable');
  return context;
}

function BrandMark({ onClick }: { onClick?: () => void }) {
  return <Link href="/" className="brand-mark" onClick={onClick}>
    <img className="brand-crest" src={brandConfig.crestUrl} alt={brandConfig.logoAlt} />
    <span className="wordmark" aria-hidden="true"><span>SAER</span><span className="wordmark-gold">GOLD</span></span>
  </Link>;
}

function LanguageSelect({ variant = 'header' }: { variant?: 'header' | 'mobile' }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = languageOptions.find((option) => option.value === language) ?? languageOptions[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (value: Language) => {
    setLanguage(value);
    setOpen(false);
  };

  return <div className={`language-select language-select-${variant}`} ref={containerRef}>
    <button
      type="button"
      className="language-trigger"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-label={`${text('languageSelectLabel', language)} — ${current.label}`}
      onClick={() => setOpen((value) => !value)}
      data-testid="language-select-trigger"
    >
      <span className="language-flag" aria-hidden="true">{current.flag}</span>
      <span className="language-label">{current.label}</span>
      <span className="language-code" aria-hidden="true">{current.short}</span>
      <ChevronDown size={12} className="language-chevron" aria-hidden="true" />
    </button>
    {open && <ul className="language-menu" role="listbox" aria-label={text('languageSelectLabel', language)}>
      {languageOptions.map((option) => <li key={option.value} role="option" aria-selected={language === option.value}>
        <button type="button" onClick={() => choose(option.value)} data-testid={`language-${option.value.toLowerCase()}`}>
          <span className="language-flag" aria-hidden="true">{option.flag}</span>
          <span>{option.label}</span>
          {option.value === 'WO' && <em className="language-pending">{text('wolofPending', language)}</em>}
          {language === option.value && <Check size={12} aria-hidden="true" />}
        </button>
      </li>)}
    </ul>}
  </div>;
}

function useMetadata(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const updateMeta = (selector: string, keyAttribute: string, keyValue: string, value: string) => {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(keyAttribute, keyValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  }, [title, description]);
}

function HashAnchorScroll() {
  const [location] = useLocation();
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (!anchor) return;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(anchor));
      if (!target) return;
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start' });
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  return null;
}

function LanguageNotice() {
  const { language } = useLanguage();
  if (language !== 'WO') return null;
  return <div className="language-notice" role="status">{text('wolofNotice', language)}</div>;
}

function SocialLinks({ className = '' }: { className?: string }) {
  const { language } = useLanguage();
  return <div className={`social-links ${className}`} aria-label={text('social', language)}>
    {contactConfig.socials.map((social) => {
      const Icon = socialIcons[social.key as keyof typeof socialIcons];
      const label = text(socialLabelKeys[social.key as keyof typeof socialLabelKeys], language);
      return <a key={social.key} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={label} data-testid={`link-social-${social.key}`}>
        <Icon aria-hidden="true" />
        <span>{social.label}</span>
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>;
    })}
  </div>;
}

function WhatsAppButton({ floating = false, className: extraClassName = '' }: { floating?: boolean; className?: string }) {
  const { language } = useLanguage();
  const digits = contactConfig.whatsappNumber.replace(/\D/g, '');
  const href = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text('whatsappGreeting', language))}`
    : undefined;
  const label = contactConfig.whatsappNumber ? text('whatsapp', language) : text('whatsappUnavailable', language);
  const className = `${floating ? 'whatsapp-button whatsapp-float' : 'whatsapp-button'} ${extraClassName}`.trim();

  return href
    ? <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-testid={floating ? 'link-whatsapp-floating' : 'link-whatsapp'}>
        <MessageCircle size={floating ? 19 : 16} aria-hidden="true" />
        <span>{text('whatsapp', language)}</span>
        {!floating && <ArrowUpRight size={14} aria-hidden="true" />}
      </a>
    : <button className={`${className} whatsapp-pending`} type="button" disabled aria-label={label} data-testid={floating ? 'button-whatsapp-floating' : 'button-whatsapp'}>
        <MessageCircle size={floating ? 19 : 16} aria-hidden="true" />
        <span>{text('whatsapp', language)}</span>
        {!floating && <ArrowUpRight size={14} aria-hidden="true" />}
      </button>;
}

function Header() {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const onHome = location === '/';
  const navItems = [
    { label: text('home', language), href: '/' },
    { label: text('universe', language), href: onHome ? '#universe' : '/#universe' },
    { label: text('collections', language), href: onHome ? '#collections' : '/#collections' },
    { label: text('creations', language), href: onHome ? '#creations' : '/#creations' },
    { label: text('expertise', language), href: onHome ? '#expertise' : '/#expertise' },
    { label: text('factory', language), href: onHome ? '#factory' : '/#factory' },
  ];
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <header className={`site-header ${location === '/contact' ? 'site-header-light' : ''}`}>
        <BrandMark onClick={closeMenu} />
        <nav className="desktop-nav" aria-label={text('mainNavLabel', language)}>
          {navItems.map((item) => <Link key={item.href + item.label} href={item.href} className="nav-link">{item.label}</Link>)}
          <Link href="/contact" className={`nav-link ${location === '/contact' ? 'active' : ''}`}>{text('contact', language)}</Link>
        </nav>
        <div className="header-tools">
          <LanguageSelect />
          <Link className="header-contact" href="/contact">{text('contact', language)} <ArrowUpRight size={13} /></Link>
          <button className="menu-toggle" type="button" aria-label={text(menuOpen ? 'menuClose' : 'menuOpen', language)} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {menuOpen && <nav className="mobile-nav" aria-label={text('mobileNavLabel', language)}>
        {navItems.map((item) => <Link key={item.href + item.label} href={item.href} onClick={closeMenu}>{item.label}<ArrowRight size={16} /></Link>)}
        <Link href="/contact" onClick={closeMenu}>{text('contact', language)}<ArrowRight size={16} /></Link>
        <div className="mobile-language">
          <span className="eyebrow">{text('languageLabel', language)}</span>
          <LanguageSelect variant="mobile" />
        </div>
      </nav>}
    </>
  );
}

function PhotoPlaceholder({ className = '', language, label = 'imagePlaceholder' }: { className?: string; language: Language; label?: CopyKey }) {
  return <div className={`image-placeholder ${className}`} role="img" aria-label={text(label, language)} data-testid="image-original-photo-placeholder">
    <span className="placeholder-label">{text(label, language)}</span>
  </div>;
}

function MediaPlaceholder({ language, label = 'factoryMediaPlaceholder', className = '' }: { language: Language; label?: CopyKey; className?: string }) {
  return <div className={`media-placeholder ${className}`} role="img" aria-label={text(label, language)}>
    <span className="media-placeholder-mark" aria-hidden="true">+</span>
    <span>{text(label, language)}</span>
  </div>;
}

function GalleryItem({ index, label, className = '' }: { index: string; label: CopyKey; className?: string }) {
  const { language } = useLanguage();
  return <figure className={`gallery-item ${className}`}>
    <PhotoPlaceholder className="gallery-item-photo" language={language} />
    <figcaption>
      <span className="gallery-number serif">{index}</span>
      <span className="gallery-caption">
        <strong>{text(label, language)}</strong>
        <em>{text('galleryStoryPending', language)}</em>
      </span>
    </figcaption>
  </figure>;
}

function ExpertiseSection() {
  const { language } = useLanguage();
  const pillars = [
    { title: 'expertisePillarFiligreeTitle', body: 'expertisePillarFiligreeText' },
    { title: 'expertisePillarTwistTitle', body: 'expertisePillarTwistText' },
    { title: 'expertisePillarBespokeTitle', body: 'expertisePillarBespokeText' },
  ] as const;
  return <section className="expertise-section" id="expertise" aria-labelledby="expertise-title">
    <div className="expertise-media">
      <PhotoPlaceholder className="expertise-photo" language={language} />
      <div className="expertise-media-caption">
        <span className="serif">SAER GOLD</span>
        <span>Dakar · Sénégal</span>
      </div>
    </div>
    <div className="expertise-copy">
      <div className="section-kicker eyebrow"><span className="gold-rule" />{text('expertiseEyebrow', language)}</div>
      <h2 id="expertise-title" className="serif">{text('expertiseTitle', language)}</h2>
      <p className="expertise-lead">{text('expertiseLead', language)}</p>
      <p className="expertise-body">{text('expertiseBody', language)}</p>
      <div className="expertise-pillars">
        {pillars.map((pillar, index) => <article className="expertise-pillar" key={pillar.title}>
          <span className="expertise-index serif">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="serif">{text(pillar.title, language)}</h3>
          <p>{text(pillar.body, language)}</p>
        </article>)}
      </div>
      <div className="expertise-actions">
        <Link href="/contact" className="gold-button">{text('heroContact', language)} <ArrowUpRight size={14} /></Link>
        <WhatsAppButton className="whatsapp-on-dark" />
      </div>
      <p className="expertise-source">{text('expertiseSource', language)}<br /><span>{text('expertiseValidation', language)}</span></p>
    </div>
  </section>;
}

function TestimonialsSection() {
  const { language } = useLanguage();
  return <section className="testimonials-section" id="avis" aria-labelledby="testimonials-title">
    <div className="testimonials-heading">
      <div>
        <div className="section-kicker eyebrow"><span className="gold-rule" />{text('testimonialsEyebrow', language)}</div>
        <h2 id="testimonials-title" className="serif">{text('testimonialsTitle', language)}</h2>
      </div>
      <p>{text('testimonialsIntro', language)}</p>
    </div>
    <div className="testimonials-grid">
      {[1, 2, 3].map((slot) => <article className="testimonial-card" key={slot}>
        <Quote className="testimonial-quote" size={26} strokeWidth={1.2} aria-hidden="true" />
        <span className="testimonial-slot eyebrow">{text('testimonialSlot', language)} · 0{slot}</span>
        <p className="testimonial-body">{text('testimonialSlotBody', language)}</p>
        <div className="testimonial-footer">
          <span className="testimonial-avatar" aria-hidden="true" />
          <span>
            <strong>{text('testimonialNameSlot', language)}</strong>
            <em>{text('testimonialDetailSlot', language)}</em>
          </span>
        </div>
      </article>)}
    </div>
  </section>;
}

function CreationStorySection() {
  const { language } = useLanguage();
  return <section className="creation-story-section" id="creations" aria-labelledby="creation-story-title">
    <div className="creation-story-heading">
      <div>
        <div className="section-kicker eyebrow"><span className="gold-rule" />{text('originalEyebrow', language)}</div>
        <h2 id="creation-story-title" className="serif">{text('originalTitle', language)}</h2>
      </div>
      <p>{text('storyIntro', language)}</p>
    </div>
    <article className="creation-story-card">
      <div className="creation-story-media">
        <PhotoPlaceholder className="creation-story-main-photo" language={language} label="mainPhotoLabel" />
        <div className="creation-story-gallery">
          <PhotoPlaceholder language={language} label="macroPhotoLabel" />
          <MediaPlaceholder language={language} label="videoLabel" />
        </div>
      </div>
      <div className="creation-story-copy">
        <p className="template-note eyebrow">{text('storyTemplateNotice', language)}</p>
        <span className="story-official-name">{creationStoryTemplate.officialName || text('officialContentPlaceholder', language)}</span>
        <h3 className="serif">{text('storyTemplateTitle', language)}</h3>
        <div className="story-fields">
          {creationDetailFields.map(({ key, label }) => <div className="story-field" key={key}>
            <span className="eyebrow">{text(label, language)}</span>
            <p>{creationStoryTemplate[key] || text('officialContentPlaceholder', language)}</p>
          </div>)}
        </div>
      </div>
    </article>
  </section>;
}

function FactorySection() {
  const { language } = useLanguage();
  return <section className="factory-section" id="factory" aria-labelledby="factory-title">
    <div className="factory-heading">
      <div className="section-kicker eyebrow"><span className="gold-rule" />{text('factoryEyebrow', language)}</div>
      <h2 id="factory-title" className="serif">{text('factoryTitle', language)}</h2>
      <div className="factory-heading-bottom">
        <p>{text('factoryIntro', language)}</p>
        <p className="factory-disclaimer">{text('factoryDisclaimer', language)}</p>
      </div>
    </div>
    <div className="factory-grid">
      {factoryChapterKeys.map((chapter, index) => <article className="factory-card" key={chapter}>
        <PhotoPlaceholder className="factory-card-photo" language={language} label="factoryMediaPlaceholder" />
        <div className="factory-card-caption">
          <span className="factory-index serif">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="serif">{text(chapter, language)}</h3>
          <ArrowUpRight size={15} aria-hidden="true" />
        </div>
      </article>)}
    </div>
    <MediaPlaceholder language={language} label="factoryMediaPlaceholder" className="factory-video-slot" />
  </section>;
}

function SocialDiscoverySection() {
  const { language } = useLanguage();
  return <section className="social-discovery-section" id="social" aria-labelledby="social-discovery-title">
    <div className="social-discovery-heading">
      <div className="section-kicker eyebrow"><span className="gold-rule" />{text('social', language)}</div>
      <h2 id="social-discovery-title" className="serif">{text('socialDiscoverTitle', language)}</h2>
      <p>{text('socialDiscoverNote', language)}</p>
      <SocialLinks className="social-discovery-links" />
    </div>
    <div className="social-media-slots">
      <MediaPlaceholder language={language} label="socialVideoSlot" className="social-video-slot" />
      <MediaPlaceholder language={language} label="socialCampaignSlot" className="social-campaign-slot" />
    </div>
  </section>;
}

function Home() {
  const { language } = useLanguage();
  useMetadata(text('homeMetaTitle', language), text('homeMetaDescription', language));
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-photo"><PhotoPlaceholder language={language} /></div>
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span className="gold-rule" />{text('heroEyebrow', language)}</div>
          <h1 id="hero-title" className="hero-title serif">SAER<br /><span>GOLD</span></h1>
          <p className="hero-tagline">{text('heroTagline', language)}</p>
          <div className="hero-actions">
            <a className="gold-button" href="#collections">{text('heroExplore', language)} <ArrowDown size={14} /></a>
            <Link className="outline-button" href="/contact">{text('heroContact', language)} <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <div className="hero-side-note"><span>DAKAR</span><span className="note-line" /><span>SÉNÉGAL</span></div>
        <div className="hero-bottom"><span>SAER GOLD</span></div>
      </section>

      <section className="intro-section" id="universe">
        <div className="intro-mark serif">S.</div>
        <div className="intro-copy">
          <div className="section-kicker eyebrow"><span className="gold-rule" />{text('universeEyebrow', language)}</div>
          <h2 className="serif">{text('universeTitle', language)}</h2>
          <p className="intro-tagline">{text('creativeSignatureLabel', language)}</p>
          <p className="creative-signature serif">{text('creativeSignature', language)}</p>
        </div>
        <div className="intro-image"><PhotoPlaceholder language={language} /></div>
      </section>

      <section className="collections-section" id="collections">
        <div className="section-heading">
          <div>
            <div className="section-kicker eyebrow"><span className="gold-rule" />{text('collectionEyebrow', language)}</div>
            <h2 className="serif">{text('collectionTitle', language)}</h2>
          </div>
          <p className="section-note">{text('collectionNote', language)}</p>
        </div>
        <div className="collection-gallery">
          <GalleryItem className="collection-photo-tall" index="01" label="gallerySlotParure" />
          <GalleryItem className="collection-photo-small" index="02" label="gallerySlotDetail" />
          <GalleryItem className="collection-photo-wide" index="03" label="gallerySlotAtelier" />
        </div>
        <div className="gallery-index"><span>SAER GOLD</span><span className="index-rule" /><span>{text('collectionNote', language)}</span></div>
      </section>

      <ExpertiseSection />

      <CreationStorySection />

      <section className="craft-section" id="craft">
        <div className="craft-title-block">
          <div className="section-kicker eyebrow"><span className="gold-rule" />{text('craftEyebrow', language)}</div>
          <h2 className="serif">{text('craftTitle', language)}</h2>
          <p>{text('craftNote', language)}</p>
        </div>
        <PhotoPlaceholder className="craft-photo-main" language={language} />
        <PhotoPlaceholder className="craft-photo-detail" language={language} />
        <div className="craft-number serif">S<span>.</span></div>
      </section>

      <FactorySection />
      <TestimonialsSection />
      <SocialDiscoverySection />

      <section className="visit-section">
        <div className="visit-image"><PhotoPlaceholder language={language} /></div>
        <div className="visit-copy">
          <div className="section-kicker eyebrow"><span className="gold-rule" />{text('heroEyebrow', language)}</div>
          <h2 className="serif">{text('visit', language)}</h2>
          <p>{text('address', language)}</p>
          <Link href="/contact" className="gold-button">{text('contact', language)} <ArrowUpRight size={14} /></Link>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  const { language } = useLanguage();
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'denied' | 'unavailable'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'done' | 'error'>('idle');
  useMetadata(text('contactMetaTitle', language), text('contactMetaDescription', language));
  const destinationEncoded = encodeURIComponent(contactConfig.address);
  const mapSrc = mapPosition
    ? `https://www.google.com/maps?q=${mapPosition.lat},${mapPosition.lng}&z=15&output=embed`
    : `https://www.google.com/maps?q=${destinationEncoded}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationEncoded}`;

  const locateMe = () => {
    if (!navigator.geolocation) {
      setGeoStatus('unavailable');
      return;
    }
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMapPosition({ lat: coords.latitude, lng: coords.longitude });
        setGeoStatus('idle');
      },
      (error) => setGeoStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'unavailable'),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 },
    );
  };

  const shareAddress = async () => {
    setShareStatus('idle');
    try {
      if (navigator.share) {
        await navigator.share({ title: 'SAER GOLD', text: contactConfig.address, url: contactConfig.mapsSearchUrl });
        setShareStatus('done');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactConfig.address);
        setShareStatus('done');
      } else {
        setShareStatus('error');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(contactConfig.address);
        setShareStatus('done');
      } catch {
        setShareStatus('error');
      }
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-heading">
        <div className="contact-heading-inner">
          <Link href="/" className="back-link"><ArrowLeft size={15} /> SAER GOLD</Link>
          <div className="section-kicker eyebrow"><span className="gold-rule" />{text('heroEyebrow', language)}</div>
          <h1 className="serif">{text('contactTitle', language)}<span className="contact-period">.</span></h1>
          <p>{text('contactIntro', language)}</p>
        </div>
        <span className="contact-heading-ornament serif">S.</span>
      </section>
      <section className="contact-details">
        <div className="contact-info">
          <div className="info-block">
            <div className="info-icon"><MapPin size={18} strokeWidth={1.4} /></div>
            <div>
              <span className="eyebrow info-label">{text('mapLocation', language)}</span>
              <p className="address-copy" data-testid="text-address">{text('address', language)}</p>
              <div className="map-actions">
                <a className="gold-button" href={contactConfig.mapsSearchUrl} target="_blank" rel="noreferrer" data-testid="link-map-location"><MapPin size={14} />{text('locationView', language)}</a>
                <button className="outline-button light-outline" onClick={locateMe} type="button" data-testid="button-locate"><Navigation size={14} />{text('locate', language)}</button>
              </div>
              {geoStatus === 'loading' && <p className="status-message" role="status">{text('geoLoading', language)}</p>}
              {geoStatus === 'denied' && <p className="status-message" role="alert">{text('geoDenied', language)}</p>}
              {geoStatus === 'unavailable' && <p className="status-message" role="alert">{text('geoUnavailable', language)}</p>}
          {mapPosition && <p className="status-message" role="status">{text('mapPositionStatus', language)}</p>}
            </div>
          </div>
          <div className="info-block phone-block">
            <div className="info-icon"><Compass size={18} strokeWidth={1.4} /></div>
            <div>
              <span className="eyebrow info-label">{text('phones', language)}</span>
              <div className="phone-list">
                {contactConfig.phones.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`} className="phone-link" data-testid={`link-phone-${phone.tel}`}>
                  {phone.display}<ArrowUpRight size={13} />
                </a>)}
              </div>
            </div>
          </div>
          <div className="info-block digital-block">
            <div className="info-icon"><Globe2 size={18} strokeWidth={1.4} /></div>
            <div className="digital-content">
              <span className="eyebrow info-label">{text('whatsapp', language)}</span>
              <WhatsAppButton />
              {!contactConfig.whatsappNumber && <span className="config-placeholder" id="whatsapp-status">{text('whatsappUnavailable', language)}</span>}
              <span className="eyebrow info-label social-label">{text('social', language)}</span>
              <SocialLinks className="contact-social-links" />
            </div>
          </div>
          <button type="button" className="share-button" onClick={shareAddress} data-testid="button-share-address">
            {shareStatus === 'done' ? <Check size={15} /> : <Share2 size={15} />}{text('share', language)}
          </button>
          {shareStatus === 'done' && <p className="status-message" role="status">{text('shareDone', language)}</p>}
          {shareStatus === 'error' && <p className="status-message" role="alert">{text('shareError', language)}</p>}
        </div>
        <div className="map-column">
          <div className="map-topline"><span className="eyebrow"><span className="map-dot" />{text('mapDistrict', language)}</span><span className="eyebrow">{text('mapCountry', language)}</span></div>
          <div className="contact-map">
            <iframe title={text('mapTitle', language)} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="map-footer">
            <span>{text('address', language)}</span>
            <a href={directionsUrl} target="_blank" rel="noreferrer" data-testid="link-directions">{text('directions', language)} <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  const { language } = useLanguage();
  return <footer className="site-footer">
    <div className="footer-top">
      <Link href="/" className="footer-brand" aria-label={brandConfig.logoAlt}><img className="footer-logo" src={brandConfig.fullLogoUrl} alt={brandConfig.logoAlt} /></Link>
      <div className="footer-slogan">{text('footerMark', language)}</div>
      <SocialLinks className="footer-social" />
      <Link href="/contact" className="footer-contact">{text('contact', language)} <ArrowUpRight size={14} /></Link>
    </div>
    <div className="footer-disclosure">
      <span className="eyebrow footer-novatech-label">{text('novatechLabel', language)}</span>
      <p>{text('novatechProposal', language)}</p>
    </div>
    <div className="footer-bottom">
      <span>© SAER GOLD · {text('legal', language)}</span>
      <span>{text('address', language)}</span>
      <div className="footer-phones" aria-label={text('phones', language)}>
        {contactConfig.phones.map((phone) => <a key={phone.tel} href={`tel:${phone.tel}`} data-testid={`footer-phone-${phone.tel}`}>{phone.display}</a>)}
      </div>
      <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>↑</a>
    </div>
  </footer>;
}

function NotFound() {
  const { language } = useLanguage();
  return <main className="not-found"><div className="eyebrow">SAER GOLD</div><h1 className="serif">404</h1><Link href="/" className="gold-button">{text('notFoundLabel', language)} <ArrowRight size={14} /></Link></main>;
}

function App() {
  const [language, setLanguage] = useState<Language>('FR');
  useEffect(() => {
    // Wolof copy is not published yet: the French fallback is displayed, so the document stays French.
    document.documentElement.lang = language === 'EN' ? 'en' : 'fr';
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <HashAnchorScroll />
      <div className="site-shell" id="top">
        <Header />
        <LanguageNotice />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
        <WhatsAppButton floating />
      </div>
    </WouterRouter>
  </LanguageContext.Provider>;
}

export default App;

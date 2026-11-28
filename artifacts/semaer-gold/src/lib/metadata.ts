import { useEffect } from 'react';

export function useMetadata(title: string, description: string) {
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

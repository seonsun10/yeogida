declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackOutboundClick(service: {
  slug: string;
  name: string;
  url: string;
}) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'outbound_click', {
    service_slug: service.slug,
    service_name: service.name,
    destination_url: service.url,
  });
}

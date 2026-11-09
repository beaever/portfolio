import type { MetadataRoute } from 'next';
import { NAV_ITEMS } from '@/constants/data';

export const dynamic = 'force-static';

const SITE_URL = 'https://beaever.github.io/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_ITEMS.map((item) => ({
    url: `${SITE_URL}${item.href}`,
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.8,
  }));
}

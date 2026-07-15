import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://beaever.github.io/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

import type { MetadataRoute } from 'next';
import { getAllCartas, getAllEmails } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://senecai.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/cartas` },
    { url: `${SITE_URL}/emails` },
    { url: `${SITE_URL}/buzon` },
    { url: `${SITE_URL}/about` },
  ];

  const cartaRoutes: MetadataRoute.Sitemap = getAllCartas().map((piece) => ({
    url: `${SITE_URL}/cartas/${piece.slug}`,
    lastModified: piece.date,
  }));

  const emailRoutes: MetadataRoute.Sitemap = getAllEmails().map((piece) => ({
    url: `${SITE_URL}/emails/${piece.slug}`,
    lastModified: piece.date,
  }));

  return [...staticRoutes, ...cartaRoutes, ...emailRoutes];
}

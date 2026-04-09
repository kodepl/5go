import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../pbn-config';

export async function GET(context) {
  // Pobierz wszystkie artykuły
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  
  // Zbierz wszystkie unikalne tagi
  const allTags = new Set();
  posts.forEach(post => {
    post.data.tags?.forEach(tag => {
      allTags.add(tag.toLowerCase().replace(/\s+/g, '-'));
    });
  });

  const currentDate = new Date().toISOString().split('T')[0];

  // Generuj XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Strona główna -->
  <url>
    <loc>${SITE_CONFIG.url}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Artykuły -->
  ${posts.map(post => {
    const postDate = post.data.updatedDate 
      ? post.data.updatedDate.toISOString().split('T')[0]
      : post.data.pubDate.toISOString().split('T')[0];
    return `  <url>
    <loc>${SITE_CONFIG.url}/blog/${post.slug}/</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n')}

  <!-- Tagi -->
  ${Array.from(allTags).map(tag => `  <url>
    <loc>${SITE_CONFIG.url}/tag/${tag}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

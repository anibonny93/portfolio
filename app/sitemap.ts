import type { MetadataRoute } from 'next';
import { tracks, projects } from '@/data/portfolio';
import { siteUrl } from '@/lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['', '/about','/projects','/publications','/contact',...tracks.map(t=>`/tracks/${t.id}`),...projects.map(p=>`/projects/${p.id}`)].map(p=>({url:`${siteUrl}${p}/`}))}

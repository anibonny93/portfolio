import type { Metadata } from 'next';
import { profile } from '@/data/portfolio';
export const asset = (path:string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl).replace(/\/$/, '');
export function metadata(title:string, description:string, path=''): Metadata { return { title, description, alternates:{canonical:`${siteUrl}${path}/`}, openGraph:{title:`${title} | ${profile.name}`,description,url:`${siteUrl}${path}/`,type:'website',siteName:profile.name}, twitter:{card:'summary',title,description} }; }

import type { Metadata } from 'next';
import { profile } from '@/data/portfolio';
import { siteUrl } from '@/lib/site';
import { Header, PageTransition } from '@/components/interactive';
import { Footer } from '@/components/shared';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(`${siteUrl}/`),title:{default:`${profile.name} | Engineering Portfolio`,template:`%s | ${profile.name}`},description:profile.introduction,openGraph:{title:profile.name,description:profile.introduction,type:'website'},robots:{index:true,follow:true}};
const themeScript="try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}";
export default function RootLayout({children}:{children:React.ReactNode}){const person={'@context':'https://schema.org','@type':'Person',name:profile.name,url:siteUrl,jobTitle:profile.role,worksFor:{'@type':'Organization',name:profile.organization},address:{'@type':'PostalAddress',addressLocality:'Ruston',addressRegion:'Louisiana'},alumniOf:{'@type':'CollegeOrUniversity',name:'Louisiana Tech University'},sameAs:[profile.linkedin,profile.github,profile.scholar].filter(Boolean),...(profile.email?{email:profile.email}:{})};return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main" tabIndex={-1}><PageTransition>{children}</PageTransition></main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/></body></html>}

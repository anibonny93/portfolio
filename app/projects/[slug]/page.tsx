import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { projects, tracks } from '@/data/portfolio';
import { metadata } from '@/lib/site';
import { ContactBand, PageIntro } from '@/components/shared';
export const dynamicParams=false;
export const generateStaticParams=()=>projects.map(p=>({slug:p.id}));
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.id===slug);return p?metadata(p.title,p.problem,`/projects/${slug}`):{}}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.id===slug);if(!p)notFound();return <div className="shell"><Link className="text-link back-link" href="/projects/"><ArrowLeft size={16}/>All projects</Link><PageIntro eyebrow={p.category} title={p.title} description={p.problem}/><div className="project-detail"><section><span className="eyebrow">01 / Context</span><h2>Problem</h2><p>{p.problem}</p></section><section><span className="eyebrow">02 / Method</span><h2>Approach</h2><p>{p.approach}</p></section><section><span className="eyebrow">03 / Toolkit</span><h2>Tools & methods</h2><div className="tags">{p.tools.map(t=><span key={t}>{t}</span>)}</div></section><section className="outcome"><span className="eyebrow">04 / Result</span><h2>Outcome</h2><p>{p.outcome}</p></section></div><section className="related-tracks"><h2>Relevant role tracks</h2><div className="tags">{p.tags.map(id=><Link className="button secondary" key={id} href={`/tracks/${id}/`}>{tracks.find(t=>t.id===id)?.name}</Link>)}</div></section><ContactBand/></div>}

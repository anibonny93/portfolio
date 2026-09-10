import Link from 'next/link';
import { ArrowUpRight, Wind, Cog, Layers3, Route, Atom, ChartNoAxesCombined } from 'lucide-react';
import { profile, tracks } from '@/data/portfolio';
import { ResumeLink } from './interactive';
export const trackIcons=[Wind,Cog,Layers3,Route,Atom,ChartNoAxesCombined];
export function TrackCards(){return <div className="track-grid">{tracks.map((t,i)=>{const Icon=trackIcons[i];return <Link className="track-card" key={t.id} href={`/tracks/${t.id}/`}><div className="card-top"><Icon size={27} strokeWidth={1.4}/><span>0{i+1}</span></div><h3>{t.name}</h3><p>{t.short}</p><span className="card-bottom">Explore this track <ArrowUpRight size={19}/></span></Link>})}</div>}
export function ContactBand(){return <section className="contact-band"><div><p className="eyebrow">Let’s connect</p><h2>Engineering your next team?</h2><p>{profile.location} · {profile.relocation}</p></div><Link className="button" href="/contact/">Start a conversation <ArrowUpRight size={18}/></Link></section>}
export function Footer(){return <footer className="footer"><div><Link className="footer-name" href="/">{profile.name}</Link><p>Mechanical engineering · Sustainable materials · Simulation</p></div><div className="footer-links"><ResumeLink className="text-link"/><Link href="/contact/">Contact <ArrowUpRight size={15}/></Link></div><p className="copyright">© {new Date().getFullYear()} {profile.name} · {profile.location}</p></footer>}
export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></div>}

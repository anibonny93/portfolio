import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { asset, metadata } from '@/lib/site';
import { HiringSelector, ResumeLink, Reveal } from '@/components/interactive';
import { ContactBand, TrackCards } from '@/components/shared';
export const generateMetadata=()=>metadata('Engineering Portfolio',profile.introduction);
export default function Home(){return <><section className="hero shell"><div className="hero-copy"><p className="eyebrow">Mechanical engineer · Ph.D.</p><h1>{profile.name.split(' ')[0]}<br/><em>{profile.name.split(' ').slice(1).join(' ')}.</em></h1><h2>{profile.positioning}</h2><p className="lead">{profile.introduction}</p><div className="hero-buttons"><ResumeLink/><Link className="text-link" href="/about/">The full story <ArrowUpRight size={17}/></Link></div><p className="location"><MapPin size={15}/>{profile.location}<span> / </span>{profile.relocation}</p></div><div className="portrait"><Image src={asset(profile.headshot)} alt={profile.headshotAlt} width={600} height={720} priority sizes="(max-width: 700px) 85vw, 340px"/><div className="portrait-caption"><span className="eyebrow">Currently</span><strong>{profile.role}</strong><span>{profile.organization}</span></div></div></section><section className="expertise-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">One background. Six perspectives.</p><h2>Find your engineering fit.</h2></div><p>Explore the experience, methods and tools<br className="desktop-break"/> most relevant to your team.</p></div><HiringSelector/><Reveal><TrackCards/></Reveal></div></section><div className="shell"><ContactBand/></div></>}

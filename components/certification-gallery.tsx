import Image from 'next/image';
import { Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { certifications } from '@/data/portfolio';
import { asset } from '@/lib/site';

export function CertificationGallery(){
 return <div className="certification-grid">{certifications.map(c=><article className="certification-card" key={c.id}>
  {c.image&&c.document?<a className="certificate-preview" href={asset(c.document)} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.title} certificate`}>
   <Image src={asset(c.image)} alt={`${c.title} certificate issued by ${c.issuer}`} width={1200} height={928} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 350px"/>
   <span>Open certificate <ArrowUpRight size={16}/></span>
  </a>:<div className="certificate-milestone" aria-hidden="true"><Award size={52} strokeWidth={1.25}/><span>PE exam</span><strong>Passed</strong></div>}
  <div className="certificate-copy">
   <p className="eyebrow">{c.category}</p><h2>{c.title}</h2><p className="certificate-issuer">{c.issuer} · {c.date}</p>
   <p>{c.detail}</p><div className="certificate-status"><CheckCircle2 size={16}/>{c.status}</div>
   {c.verificationUrl&&<a className="text-link" href={c.verificationUrl} target="_blank" rel="noopener noreferrer">Verify credential <ArrowUpRight size={16}/></a>}
  </div>
 </article>)}</div>
}

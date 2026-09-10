import { CertificationGallery } from '@/components/certification-gallery';
import { ContactBand, PageIntro } from '@/components/shared';
import { metadata } from '@/lib/site';

export const generateMetadata=()=>metadata('Certifications','Engineering credentials, professional certifications, course certificates and PE exam progress.','/certifications');
export default function Certifications(){return <div className="shell"><PageIntro eyebrow="Credentials & development" title="Verified learning, applied discipline." description="Engineering credentials and focused professional development across licensure, quality, operations, project management and computing."/><CertificationGallery/><ContactBand/></div>}

import { PageIntro, ContactBand } from '@/components/shared';
import { PublicationCatalog } from '@/components/catalogs';
import { metadata } from '@/lib/site';
export const generateMetadata=()=>metadata('Publications & Service','Research citations and peer review service for TRB and Transportation Research Record.','/publications');
export default function Publications(){return <div className="shell"><PageIntro eyebrow="Research & service" title="Contributing to the conversation." description="Journal articles, conference papers and technical peer review in materials and transportation research."/><PublicationCatalog/><ContactBand/></div>}

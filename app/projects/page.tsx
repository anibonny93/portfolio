import { PageIntro, ContactBand } from '@/components/shared';
import { ProjectCatalog } from '@/components/catalogs';
import { metadata } from '@/lib/site';
export const generateMetadata=()=>metadata('Projects','Selected projects in sustainable materials, molecular simulation, HVAC validation and process improvement.','/projects');
export default function Projects(){return <div className="shell"><PageIntro eyebrow="Selected work" title="Questions turned into engineering work." description="Research and industrial projects, organized around the challenges they address."/><ProjectCatalog/><ContactBand/></div>}

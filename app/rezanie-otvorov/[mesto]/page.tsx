import {
  cityParams,
  cityServiceMetadata,
  CityServicePage,
} from "@/components/CityServicePage";

const SLUG = "rezanie-otvorov";

// NOTE: these service×city pages do NOT exist on the live site today.
// They are the single biggest net-new SEO opportunity in the rebuild.
export function generateStaticParams() {
  return cityParams();
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { mesto: string } }) {
  return cityServiceMetadata(SLUG, params.mesto);
}

export default function Page({ params }: { params: { mesto: string } }) {
  return <CityServicePage serviceSlug={SLUG} citySlug={params.mesto} />;
}

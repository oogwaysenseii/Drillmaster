import { cityParams, cityServiceMetadata, CityServicePage } from "@/components/CityServicePage";

const SLUG = "jadrove-vrtanie";

// Statically generate one page per published city at build time.
export function generateStaticParams() {
  return cityParams();
}

// Only generate the params above; unknown cities → 404 (no thin pages).
export const dynamicParams = false;

export function generateMetadata({ params }: { params: { mesto: string } }) {
  return cityServiceMetadata(SLUG, params.mesto);
}

export default function Page({ params }: { params: { mesto: string } }) {
  return <CityServicePage serviceSlug={SLUG} citySlug={params.mesto} />;
}

import { ServiceHub, serviceHubMetadata } from "@/components/ServiceHub";

const SLUG = "jadrove-vrtanie";

export const metadata = serviceHubMetadata(SLUG);

export default function Page() {
  return <ServiceHub slug={SLUG} />;
}

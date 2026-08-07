import type { Slide } from "@/components/EquipmentSlider";

/**
 * Machines shown in the slider next to the intro copy.
 * Add another entry and it joins the rotation automatically — no code change.
 *
 * `width`/`height` must be the real pixel dimensions of the file so next/image
 * can reserve the right box and avoid layout shift.
 */
export const equipment: Slide[] = [
  {
    src: "/img/stenova-pila.webp",
    alt: "Stenová píla Husqvarna na koľajnici – vybavenie Drillmaster na rezanie betónu",
    label: "",
    width: 425,
    height: 830,
  },
  {
    src: "/img/jadrova-vrtacka.webp",
    alt: "Jadrová vŕtačka Husqvarna na stojane s diamantovou korunkou – vybavenie Drillmaster",
    label: "",
    width: 519,
    height: 900,
  },
];

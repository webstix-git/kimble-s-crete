import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { icons } from "@/lib/site";
import styles from "./ServiceArea.module.css";

const areas = [
  {
    label: "Rockford, Loves Park & Winnebago County",
    icon: (
      <Icon d={icons.pin} size={20} stroke="#F5C518">
        <circle cx="12" cy="9" r="2.5" />
      </Icon>
    ),
  },
  {
    label: "Boone County & Northern Illinois",
    icon: (
      <Icon size={20} stroke="#F5C518">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </Icon>
    ),
  },
  {
    label: "Beloit, Janesville & Southern Wisconsin",
    icon: <Icon d="M3 12h18M14 5l7 7-7 7" size={20} stroke="#F5C518" />,
  },
];

export default function ServiceArea() {
  return (
    <section id="area" data-screen-label="Service Area" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <Eyebrow tone="ink">Service Area</Eyebrow>
          <Heading tone="dark">Based in Rockford. Working 100 miles out.</Heading>
          <p className={styles.copy}>
            We&apos;re based on North Alpine Road in Rockford and take residential
            and commercial concrete work up to 100 miles away. That includes Loves
            Park, Machesney Park and Belvidere, communities across Northern
            Illinois, and towns over the state line such as Beloit and Janesville.
          </p>
          <div className={styles.list}>
            {areas.map((area) => (
              <div key={area.label} className={styles.item}>
                {area.icon}
                {area.label}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            title="Map of the Kimble's Crete service area around Rockford, IL"
            src="https://www.google.com/maps?q=Rockford,+IL&z=8&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapFrame}
          />
          <div className={styles.radius} />
        </div>
      </div>
    </section>
  );
}

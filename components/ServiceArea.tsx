import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { icons } from "@/lib/site";
import styles from "./ServiceArea.module.css";

const MAP_SRC = "https://www.google.com/maps?ll=42.2711,-89.094&z=8&output=embed";

const areas = [
  "Rockford, Loves Park & Winnebago County",
  "Boone County & Northern Illinois",
  "Beloit, Janesville & Southern Wisconsin",
];

export default function ServiceArea() {
  return (
    <section id="area" data-screen-label="Service Area" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <Eyebrow tone="ink">Service Area</Eyebrow>
          <Heading tone="dark">Proudly Serving Rockford and Beyond</Heading>
          <p className={styles.copy}>
            We&apos;re based on North Alpine Road in Rockford and take residential
            and commercial concrete work up to 100 miles away. That includes Loves
            Park, Machesney Park and Belvidere, communities across Northern
            Illinois, and towns over the state line such as Beloit and Janesville.
          </p>
          <div className={styles.list}>
            {areas.map((area) => (
              <div key={area} className={styles.item}>
                <Icon d={icons.pin} size={20} stroke="#F5C518">
                  <circle cx="12" cy="9" r="2.5" />
                </Icon>
                {area}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            title="Map of the Kimble's Crete service area around Rockford, IL"
            src={MAP_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
            className={`${styles.mapFrame} ${styles.outside}`}
          />
          <div className={styles.inside}>
            <iframe
              title="Kimble's Crete service radius"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              aria-hidden="true"
              className={styles.mapFrame}
            />
          </div>
          <div className={styles.radius} />
        </div>
      </div>
    </section>
  );
}

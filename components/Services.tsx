import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { services } from "@/lib/site";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" data-screen-label="Services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div>
            <Eyebrow>Concrete Services</Eyebrow>
            <Heading className={styles.heading}>
              Concrete driveways, patios and slabs, done properly.
            </Heading>
          </div>
          <p className={styles.introCopy}>
            New concrete and full replacements for homes and businesses in the
            Rockford area. One crew handles every stage, from tear-out and
            grading to forming, pouring and finishing.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.name} className={styles.card}>
              <div className={styles.imageWrap}>
                <Image
                  src={service.img}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1280px) 426px, (min-width: 760px) 50vw, 100vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.iconBadge}>
                  <Icon d={service.icon} size={26} strokeWidth={1.8} round />
                </div>
                <h3 className={styles.name}>{service.name}</h3>
                <p className={styles.desc}>{service.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.footnote}>
          Don&apos;t see your project here? We also pour shed and garage slabs,
          footings and steps, and repair damaged concrete.{" "}
          <a href="#contact" className={styles.footnoteLink}>
            Ask us about your project →
          </a>
        </p>
      </div>
    </section>
  );
}

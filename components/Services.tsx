import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { icons, services } from "@/lib/site";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" data-screen-label="Services" className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.introInner}>
          <div>
            <Eyebrow>Concrete Services</Eyebrow>
            <Heading className={styles.heading}>
              <span className={styles.line}>Concrete driveways, patios</span>{" "}
              <span className={styles.line}>and slabs, done properly.</span>
            </Heading>
          </div>
          <p className={styles.introCopy}>
            New concrete and full replacements for homes and businesses in the
            Rockford area. One crew handles every stage, from tear-out and
            grading to forming, pouring and finishing. Pick a service below to
            see recent work.
          </p>
        </div>
      </div>

      {services.map((service, index) => {
        const [hero, ...gallery] = service.images;
        const reversed = index % 2 === 1;

        return (
          <article
            key={service.id}
            id={service.id}
            className={`${styles.service} ${reversed ? styles.reversed : ""} ${
              index % 2 === 0 ? styles.dark : styles.light
            }`}
          >
            <div className={styles.serviceInner}>
              <div className={styles.media}>
                <div className={styles.heroImageWrap}>
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    sizes="(min-width: 1060px) 54vw, 100vw"
                    className={styles.heroImage}
                  />
                </div>
                <div className={styles.gallery}>
                  {gallery.map((image) => (
                    <div key={image.src} className={styles.galleryItem}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1060px) 17vw, 45vw"
                        className={styles.galleryImage}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.iconBadge}>
                  <Icon d={service.icon} size={28} strokeWidth={1.8} round />
                </div>
                <Eyebrow tone={index % 2 === 0 ? "gold" : "rust"}>
                  Service
                </Eyebrow>
                <h3 className={styles.name}>{service.name}</h3>
                <p className={styles.desc}>{service.desc}</p>
                <a href="#contact" className={styles.cta}>
                  Ask about this service
                  <Icon d={icons.arrowRight} size={16} strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </article>
        );
      })}

      <div className={styles.footnoteWrap}>
        <div className={styles.footnoteBanner}>
          <div className={styles.footnoteText}>
            <p className={styles.footnoteEyebrow}>More concrete work</p>
            <h3 className={styles.footnoteTitle}>
              Don&apos;t see your project here?
            </h3>
            <p className={styles.footnote}>
              We also pour shed and garage slabs, footings and steps, and repair
              damaged concrete. Tell us what you need and we&apos;ll let you know
              if it&apos;s a fit.
            </p>
          </div>
          <a href="#contact" className={styles.footnoteCta}>
            Ask us about your project
            <Icon d={icons.arrowRight} size={18} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { heroStats, icons } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" data-screen-label="Hero" className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.eyebrow}>Concrete Contractor · Rockford, IL</div>
        <h1 className={styles.title}>
          Rockford concrete, <span className={styles.accent}>poured to last.</span>
        </h1>
        <p className={styles.lead}>
          Kimble&apos;s Crete is a locally owned Rockford concrete contractor pouring
          driveways, patios, sidewalks and foundations for homes and businesses
          across Northern Illinois and Southern Wisconsin. We treat every job
          like it&apos;s on our own street.
        </p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.primary}>
            Get Your Free Estimate
            <Icon d={icons.arrowRight} size={18} strokeWidth={2.4} />
          </a>
          <a href="#gallery" className={styles.secondary}>
            See Recent Projects
          </a>
        </div>
        <div className={styles.stats}>
          {heroStats.map((stat) => (
            <div key={stat.value} className={styles.stat}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

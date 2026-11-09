import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { icons, site } from "@/lib/site";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section data-screen-label="CTA Banner" className={styles.banner}>
      <Image
        src="/images/cta-stamped-patio.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={styles.inner}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>Free Estimates</span>
          <h2 className={styles.title}>Planning a concrete project?</h2>
          <p className={styles.sub}>
            Call today or request a free estimate. We&apos;re open 7 days a week,
            7 am to 5 pm.
          </p>
          <div className={styles.actions}>
            <a href={site.phoneHref} className={styles.callButton}>
              <Icon d={icons.phone} size={16} strokeWidth={2.2} />
              {site.phone}
            </a>
            <a href="#contact" className={styles.outlineButton}>
              Request a Free Estimate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

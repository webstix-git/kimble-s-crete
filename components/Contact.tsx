import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import ContactForm from "@/components/ContactForm";
import { icons, site } from "@/lib/site";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" data-screen-label="Contact" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <Eyebrow>Free Estimates</Eyebrow>
          <Heading>Get a free concrete estimate.</Heading>
          <p className={styles.lead}>
            Tell us a little about your project and we&apos;ll get back to you to
            schedule a free, no-pressure estimate. Prefer to talk it through?
            Give us a call. We&apos;re available seven days a week.
          </p>
          <div className={styles.details}>
            <a href={site.phoneHref} className={`${styles.detail} ${styles.detailLink}`}>
              <span className={styles.detailIcon}>
                <Icon d={icons.phone} size={20} />
              </span>
              <span className={styles.detailText}>
                <span className={styles.detailLabel}>Call</span>
                <span className={styles.phone}>{site.phone}</span>
              </span>
            </a>
            <a href={site.emailHref} className={`${styles.detail} ${styles.detailLink}`}>
              <span className={styles.detailIcon}>
                <Icon d={icons.mailFlap} size={20}>
                  <rect x="3" y="5" width="18" height="14" rx="1" />
                </Icon>
              </span>
              <span className={`${styles.detailText} ${styles.shrink}`}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.email}>{site.email}</span>
              </span>
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.detail} ${styles.detailLink}`}
            >
              <span className={styles.detailIcon}>
                <Icon d={icons.pin} size={20}>
                  <circle cx="12" cy="9" r="2.5" />
                </Icon>
              </span>
              <span className={styles.detailText}>
                <span className={styles.detailLabel}>Visit</span>
                <span className={styles.address}>
                  {site.street}
                  <br />
                  {site.suite}
                  <br />
                  {site.cityLine}
                </span>
              </span>
            </a>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>
                <Icon d={icons.clockHands} size={20}>
                  <circle cx="12" cy="12" r="9" />
                </Icon>
              </span>
              <span className={styles.detailText}>
                <span className={styles.detailLabel}>Hours</span>
                <span className={styles.address}>
                  {site.hours.days}
                  <br />
                  {site.hours.time}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

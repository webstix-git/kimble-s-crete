import Image from "next/image";
import BackToTop from "@/components/BackToTop";
import Icon from "@/components/ui/Icon";
import {
  footerQuickLinks,
  icons,
  services,
  site,
} from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <Image
              src="/images/logo.png"
              alt="Kimble's Crete logo"
              width={501}
              height={720}
              sizes="98px"
              className={styles.logo}
            />
            <p className={styles.blurb}>
              Locally owned concrete contractor in Rockford, IL, pouring
              driveways, patios and sidewalks for over nine years.
            </p>
            <div className={styles.social}>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kimble's Crete on Facebook"
                className={styles.facebook}
              >
                <Icon d={icons.facebook} size={18} fill="currentColor" />
              </a>
              <a
                href={site.yelp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kimble's Crete on Yelp"
                className={styles.yelp}
              >
                <Icon d={icons.yelp} size={18} fill="currentColor" />
              </a>
            </div>
          </div>

          <nav aria-label="Services" className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Services</h3>
            {services.map((service) => (
              <a key={service.name} href="#services" className={styles.link}>
                {service.name}
              </a>
            ))}
          </nav>

          <nav aria-label="Quick links" className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Quick Links</h3>
            {footerQuickLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <a href={site.phoneHref} className={`${styles.contactItem} ${styles.phone}`}>
              <Icon d={icons.phone} size={18} className={styles.contactIcon} />
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className={`${styles.contactItem} ${styles.link} ${styles.email}`}
            >
              <Icon d={icons.mailFlap} size={18} className={styles.contactIcon}>
                <rect x="3" y="5" width="18" height="14" rx="1" />
              </Icon>
              {site.email}
            </a>
            <address className={styles.address}>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.contactItem} ${styles.link}`}
              >
                <Icon d={icons.pin} size={18} className={styles.contactIcon}>
                  <circle cx="12" cy="9" r="2.5" />
                </Icon>
                <span>
                  {site.street}
                  <br />
                  {site.cityLine}
                </span>
              </a>
            </address>
            <div className={`${styles.contactItem} ${styles.muted}`}>
              <Icon d={icons.clockHands} size={18} className={styles.contactIcon}>
                <circle cx="12" cy="12" r="9" />
              </Icon>
              <span>
                {site.hours.days}
                <br />
                {site.hours.time}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Kimble&apos;s Crete. Locally owned concrete contractor in
            Rockford, Illinois. Free estimates on residential and commercial
            concrete.
          </p>
          <BackToTop className={styles.backToTop} />
        </div>
      </div>
    </footer>
  );
}

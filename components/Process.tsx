import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { site, steps } from "@/lib/site";
import styles from "./Process.module.css";

function withPhoneLink(text: string) {
  const [before, ...rest] = text.split(site.phone);
  if (!rest.length) return text;
  return (
    <>
      {before}
      <a href={site.phoneHref} className={styles.phoneLink}>
        {site.phone}
      </a>
      {rest.join(site.phone)}
    </>
  );
}

export default function Process() {
  return (
    <section id="process" data-screen-label="Process" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <Eyebrow tone="rust" centered>
            How It Works
          </Eyebrow>
          <Heading tone="dark">From first call to finished concrete.</Heading>
        </div>
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.marker}>
                <div className={styles.iconBox}>
                  <Icon d={step.icon} size={30} strokeWidth={1.8} round />
                </div>
                <div className={styles.dash} />
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{withPhoneLink(step.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

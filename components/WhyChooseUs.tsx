import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import { reasons } from "@/lib/site";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  return (
    <section id="why" data-screen-label="Why Choose Us" className={styles.section}>
      <Image
        src="/images/why-choose-us-trucks-hd.jpg"
        alt=""
        fill
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.overlay} />
      <div className={styles.container}>
        <Eyebrow>Why Choose Kimble&apos;s Crete</Eyebrow>
        <Heading className={styles.heading}>
          Good concrete starts before the truck shows up.
        </Heading>
        <p className={styles.lead}>
          Cracked, sunken or puddling concrete usually comes down to rushed
          prep. We take our time on grading, base and joint layout, give you a
          clear estimate up front and stay in touch from the first call to the
          final sweep.
        </p>
        <div className={styles.grid}>
          {reasons.map((reason) => (
            <div key={reason.title} className={styles.reason}>
              <Icon
                d={reason.icon}
                size={30}
                stroke="#F5C518"
                strokeWidth={1.8}
                round
              />
              <h3 className={styles.title}>{reason.title}</h3>
              <p className={styles.desc}>{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

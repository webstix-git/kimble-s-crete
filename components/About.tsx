import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import { site, values } from "@/lib/site";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" data-screen-label="About" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.media}>
          <Image
            src="/images/about-entry.jpg"
            alt="Colored concrete sidewalk and front entry installed by Kimble's Crete in Rockford, IL"
            width={2880}
            height={2160}
            sizes="(min-width: 1060px) 520px, 90vw"
            className={styles.mainImage}
          />
          <Image
            src="/images/about-steps.jpg"
            alt="New poured concrete steps built into a stone retaining wall"
            width={1536}
            height={2048}
            sizes="(min-width: 1060px) 250px, 44vw"
            className={styles.insetImage}
          />
          <div className={styles.experience}>
            <span className={styles.experienceValue}>{site.yearsInBusiness}+</span>
            <span className={styles.experienceLabel}>
              Years of concrete work in Rockford
            </span>
          </div>
        </div>
        <div>
          <Eyebrow tone="rust">About Kimble&apos;s Crete</Eyebrow>
          <Heading tone="dark">
            Built in Rockford, by someone who grew up here.
          </Heading>
          <p className={styles.copy}>
            I started Kimble&apos;s Crete because concrete work is what I&apos;m
            good at, and I wanted to put that skill to use in the town that
            raised me. Along the way I noticed how few young people were coming
            into the trade, so part of my job now is showing the next generation
            that it&apos;s a craft worth learning and a living worth building.
          </p>
          <p className={`${styles.copy} ${styles.copyFollow}`}>
            Nine years in, many of the people I pour for are neighbors, old
            friends and friends of friends across Rockford. That keeps me honest. Every driveway and
            walkway I finish is one I&apos;ll be driving past for years, so it has
            to be done right.
          </p>
          <div className={styles.values}>
            {values.map((value) => (
              <span key={value} className={styles.value}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

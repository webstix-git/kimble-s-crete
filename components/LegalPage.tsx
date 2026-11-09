import type { ReactNode } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import { FloatingBackToTop } from "@/components/BackToTop";
import styles from "./LegalPage.module.css";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  updated: string;
  updatedLabel?: string;
  image: string;
  imagePosition?: string;
  children: ReactNode;
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  updatedLabel = "Last updated",
  image,
  imagePosition = "center",
  children,
}: LegalPageProps) {
  return (
    <>
      <Header />
      <main>
        <section className={styles.hero}>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.bg}
            style={{ objectPosition: imagePosition }}
          />
          <div className={styles.overlay} />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
            <p className={styles.updated}>
              {updatedLabel}: {updated}
            </p>
          </div>
        </section>
        <div className={styles.body}>
          <div className={styles.container}>
            <article className={styles.prose}>{children}</article>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingBackToTop />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | Kimble's Crete",
};

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Our Services" },
  { href: "/#why", label: "Why Choose Us" },
  { href: "/#process", label: "Our Process" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#area", label: "Service Area" },
  { href: "/#contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page}>
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
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.copy}>
            The page you requested is unavailable or may have moved. Browse the site
            pages below to continue.
          </p>
          <nav aria-label="Site pages">
            <ul className={styles.links}>
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { icons, navLinks, site } from "@/lib/site";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 960px)";

const sectionId = (href: string) => href.slice(href.indexOf("#") + 1);

function getActiveHref() {
  const sections = navLinks.map((link) => document.getElementById(sectionId(link.href)));
  if (!sections.some(Boolean)) return null;

  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return navLinks[navLinks.length - 1].href;

  const line = window.innerHeight * 0.35;
  let active: string | null = null;
  navLinks.forEach((link, i) => {
    const section = sections[i];
    if (section && section.getBoundingClientRect().top <= line) active = link.href;
  });
  return active;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        setActiveHref(getActiveHref());
      });
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  const solid = scrolled || menuOpen;
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${solid ? styles.solid : ""} ${scrolled ? "" : styles.atTop}`}
    >
      <div className={styles.bar}>
        <Link href="/#top" className={styles.logoLink}>
          <Image
            src="/images/header-logo.png"
            alt="Kimble's Crete concrete contractor logo"
            width={500}
            height={720}
            sizes="112px"
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={`${styles.navLink} ${activeHref === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a href={site.phoneHref} className={styles.callButton}>
            <Icon d={icons.phone} size={16} strokeWidth={2.2} />
            {site.phone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={styles.menuButton}
        >
          <Icon d={menuOpen ? icons.close : icons.menu} size={22} />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={`${styles.mobileLink} ${activeHref === link.href ? styles.mobileActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" onClick={closeMenu} className={styles.mobileCta}>
            Get a Free Estimate
          </Link>
        </nav>
      )}
    </header>
  );
}

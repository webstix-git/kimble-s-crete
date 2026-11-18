"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { icons, navLinks, serviceHref, services, site } from "@/lib/site";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 960px)";
const SERVICES_HREF = "/#services";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);
  const desktopMenuId = useId();
  const mobileMenuId = useId();

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
      if (e.matches) {
        setMenuOpen(false);
        setMobileServicesOpen(false);
      } else {
        setServicesOpen(false);
      }
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

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        window.clearTimeout(closeTimer.current);
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.clearTimeout(closeTimer.current);
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const solid = scrolled || menuOpen;
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };
  const servicesActive = activeHref === SERVICES_HREF;

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
          {navLinks.map((link) =>
            link.href === SERVICES_HREF ? (
              <div
                key={link.href}
                className={styles.dropdown}
                ref={dropdownRef}
                onMouseEnter={() => {
                  window.clearTimeout(closeTimer.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  window.clearTimeout(closeTimer.current);
                  closeTimer.current = window.setTimeout(() => {
                    setServicesOpen(false);
                  }, 150);
                }}
              >
                <button
                  type="button"
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${
                    servicesActive || servicesOpen ? styles.active : ""
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  aria-controls={desktopMenuId}
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  {link.label}
                  <Icon
                    d={icons.chevronDown}
                    size={16}
                    strokeWidth={2.2}
                    className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ""}`}
                  />
                </button>
                <div
                  id={desktopMenuId}
                  role="menu"
                  className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownMenuOpen : ""}`}
                >
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={serviceHref(service.id)}
                      role="menuitem"
                      className={styles.dropdownLink}
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={activeHref === link.href ? "location" : undefined}
                className={`${styles.navLink} ${activeHref === link.href ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ),
          )}
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
          {navLinks.map((link) =>
            link.href === SERVICES_HREF ? (
              <div key={link.href} className={styles.mobileGroup}>
                <button
                  type="button"
                  className={`${styles.mobileLink} ${styles.mobileTrigger} ${
                    servicesActive || mobileServicesOpen ? styles.mobileActive : ""
                  }`}
                  aria-expanded={mobileServicesOpen}
                  aria-controls={mobileMenuId}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                >
                  {link.label}
                  <Icon
                    d={icons.chevronDown}
                    size={18}
                    strokeWidth={2.2}
                    className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ""}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div id={mobileMenuId} className={styles.mobileSubnav}>
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={serviceHref(service.id)}
                        onClick={closeMenu}
                        className={styles.mobileSubLink}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={activeHref === link.href ? "location" : undefined}
                className={`${styles.mobileLink} ${activeHref === link.href ? styles.mobileActive : ""}`}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link href="/#contact" onClick={closeMenu} className={styles.mobileCta}>
            Get a Free Estimate
          </Link>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { icons, navLinks, services, site } from "@/lib/site";
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
  const servicesRef = useRef<HTMLDivElement>(null);

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
    if (!servicesOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const solid = scrolled || menuOpen;
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

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
                ref={servicesRef}
                className={styles.dropdown}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  aria-current={activeHref === link.href ? "location" : undefined}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${
                    activeHref === link.href ? styles.active : ""
                  }`}
                  onClick={() => setServicesOpen(false)}
                  onFocus={() => setServicesOpen(true)}
                >
                  {link.label}
                  <Icon
                    d={icons.chevronDown}
                    size={14}
                    strokeWidth={2.4}
                    className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ""}`}
                  />
                </Link>
                <div
                  className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownMenuOpen : ""}`}
                  role="menu"
                  aria-label="Services"
                >
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/#${service.id}`}
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
              <div key={link.href} className={styles.mobileDropdown}>
                <div className={styles.mobileDropdownRow}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={activeHref === link.href ? "location" : undefined}
                    className={`${styles.mobileLink} ${styles.mobileDropdownLink} ${
                      activeHref === link.href ? styles.mobileActive : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    className={styles.mobileDropdownToggle}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-menu"
                    aria-label="Service list"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    <Icon
                      d={icons.chevronDown}
                      size={18}
                      strokeWidth={2.2}
                      className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ""}`}
                    />
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div
                    id="mobile-services-menu"
                    className={styles.mobileDropdownMenu}
                    role="menu"
                    aria-label="Services"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/#${service.id}`}
                        role="menuitem"
                        onClick={closeMenu}
                        className={styles.mobileDropdownItem}
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

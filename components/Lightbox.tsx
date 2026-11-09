"use client";

import { useEffect, type MouseEvent } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { icons } from "@/lib/site";
import styles from "./Lightbox.module.css";

type LightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const close = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={close}
      className={styles.overlay}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        unoptimized
        loading="eager"
        className={styles.image}
      />
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className={styles.close}
        autoFocus
      >
        <Icon d={icons.close} size={20} stroke="#0E0D0B" strokeWidth={2.4} />
      </button>
    </div>
  );
}

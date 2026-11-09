"use client";

import { useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { icons } from "@/lib/site";
import styles from "./Lightbox.module.css";

type Photo = { src: string; alt: string };

type LightboxProps = {
  photos: readonly Photo[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 50;

export default function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const photo = photos[index];
  const count = photos.length;

  const showPrev = () => onIndexChange((index - 1 + count) % count);
  const showNext = () => onIndexChange((index + 1) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      else if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onClose, onIndexChange]);

  const close = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const navigate = (e: MouseEvent, go: () => void) => {
    e.stopPropagation();
    go();
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > SWIPE_THRESHOLD) showPrev();
    else if (delta < -SWIPE_THRESHOLD) showNext();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      onClick={close}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={styles.overlay}
    >
      <div className={styles.stage}>
        {count > 1 && (
          <button
            type="button"
            onClick={(e) => navigate(e, showPrev)}
            aria-label="Previous photo"
            className={`${styles.nav} ${styles.prev}`}
          >
            <Icon d={icons.chevronLeft} size={24} strokeWidth={2.4} />
          </button>
        )}
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={0}
          height={0}
          unoptimized
          loading="eager"
          className={styles.image}
        />
        {count > 1 && (
          <button
            type="button"
            onClick={(e) => navigate(e, showNext)}
            aria-label="Next photo"
            className={`${styles.nav} ${styles.next}`}
          >
            <Icon d={icons.chevronRight} size={24} strokeWidth={2.4} />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className={styles.close}
        autoFocus
      >
        <Icon d={icons.close} size={20} stroke="#0E0D0B" strokeWidth={2.4} />
      </button>
      {count > 1 && (
        <div className={styles.counter} aria-live="polite">
          {index + 1} / {count}
        </div>
      )}
    </div>
  );
}

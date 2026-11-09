"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import Lightbox from "@/components/Lightbox";
import { gallery, icons, INITIAL_GALLERY_COUNT, site } from "@/lib/site";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<(typeof gallery)[number] | null>(null);

  const shown = showAll ? gallery : gallery.slice(0, INITIAL_GALLERY_COUNT);

  return (
    <>
      <section id="gallery" data-screen-label="Gallery" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <div>
              <Eyebrow>Project Gallery</Eyebrow>
              <Heading>Recent concrete work around Rockford.</Heading>
            </div>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.facebookLink}
            >
              See More on Facebook
              <Icon d={icons.arrowUpRight} size={16} strokeWidth={2.2} />
            </a>
          </div>

          <div className={styles.masonry}>
            {shown.map((photo) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightboxPhoto(photo)}
                aria-label={`View larger: ${photo.alt}`}
                className={styles.tile}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={0}
                  height={0}
                  sizes="(min-width: 1280px) 416px, (min-width: 1000px) 33vw, (min-width: 664px) 50vw, 100vw"
                  className={styles.tileImage}
                />
              </button>
            ))}
          </div>

          {!showAll && (
            <div className={styles.moreWrap}>
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className={styles.moreButton}
              >
                Show More Projects
                <Icon d={icons.chevronDown} size={16} strokeWidth={2.4} />
              </button>
            </div>
          )}

          <div className={styles.videoLabel}>
            <Icon d={icons.play} size={20} fill="currentColor" />
            Watch Us Work
          </div>
          <div className={styles.videos}>
            <div className={styles.videoReel}>
              <iframe
                title="Kimble's Crete concrete project video"
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F27184071924564996%2F&show_text=false&width=267&t=0"
                width={267}
                height={476}
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                className={styles.reelFrame}
              />
            </div>
            <div className={styles.videoWide}>
              <iframe
                title="Kimble's Crete concrete pour video"
                src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1812532119725358%2F&show_text=false&width=560&t=0"
                width={560}
                height={314}
                scrolling="no"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                className={styles.wideFrame}
              />
            </div>
          </div>
        </div>
      </section>

      {lightboxPhoto && (
        <Lightbox
          src={lightboxPhoto.src}
          alt={lightboxPhoto.alt}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </>
  );
}

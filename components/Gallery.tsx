"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import Lightbox from "@/components/Lightbox";
import {
  gallery,
  icons,
  INITIAL_GALLERY_COUNT,
  REEL_HEIGHT,
  REEL_WIDTH,
  site,
  videoReels,
} from "@/lib/site";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const shown = showAll ? gallery : gallery.slice(0, INITIAL_GALLERY_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      document.getElementById("gallery")?.scrollIntoView({ behavior: "instant" });
    }
    setShowAll(!showAll);
  };

  return (
    <>
      <section id="gallery" data-screen-label="Gallery" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <Eyebrow>Project Gallery</Eyebrow>
            <Heading>Recent concrete work around Rockford.</Heading>
          </div>

          <div className={styles.grid}>
            {shown.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View larger: ${photo.alt}`}
                className={styles.tile}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 416px, (min-width: 1000px) 33vw, (min-width: 664px) 50vw, 100vw"
                  className={styles.tileImage}
                />
              </button>
            ))}
          </div>

          <div className={styles.moreWrap}>
            <button
              type="button"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              className={styles.moreButton}
            >
              {showAll ? "Show Less Projects" : "Show More Projects"}
              <Icon
                d={showAll ? icons.chevronUp : icons.chevronDown}
                size={16}
                strokeWidth={2.4}
              />
            </button>
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

          <div className={styles.videoBlock}>
            <div className={styles.videoIntro}>
              <div className={styles.videoLabel}>
                <Icon d={icons.play} size={20} fill="currentColor" />
                Watch Us Work
              </div>
              <h3 className={styles.videoHeading}>
                Short videos from Kimble&apos;s Crete.
              </h3>
              <p className={styles.videoCopy}>
                Press play to see a little of who we are and the concrete work we
                do around Rockford. You&apos;ll find more videos on our Facebook
                page.
              </p>
            </div>
            <div className={styles.videos}>
              {videoReels.map((video) => {
                const width = video.wide ? REEL_WIDTH * 4 : REEL_WIDTH;
                const height = video.wide ? Math.round(REEL_HEIGHT * 1.2) : REEL_HEIGHT;
                return (
                  <div
                    key={video.reel}
                    className={`${styles.video} ${video.wide ? styles.videoWide : ""}`}
                  >
                    <iframe
                      title={video.title}
                      src={`https://www.facebook.com/plugins/video.php?height=${height}&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${video.reel}%2F&show_text=false&width=${width}&t=0`}
                      width={width}
                      height={height}
                      scrolling="no"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      loading="lazy"
                      className={styles.videoFrame}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={gallery}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

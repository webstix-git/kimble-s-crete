import styles from "./CautionTape.module.css";

const SEGMENTS = Array.from({ length: 18 }, (_, i) => i);

function Ribbon({ className }: { className: string }) {
  return (
    <div className={`${styles.ribbon} ${className}`}>
      {SEGMENTS.map((i) => (
        <span key={i} className={styles.segment}>
          <span className={styles.word}>Caution</span>
          <span className={styles.stripes} />
        </span>
      ))}
    </div>
  );
}

export default function CautionTape() {
  return (
    <div className={styles.tape} aria-hidden="true">
      <div className={styles.inner}>
        <Ribbon className={styles.back} />
        <Ribbon className={styles.front} />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  tone?: "gold" | "rust" | "ink";
  centered?: boolean;
  children: ReactNode;
};

export default function Eyebrow({
  tone = "gold",
  centered = false,
  children,
}: EyebrowProps) {
  return (
    <div
      className={`${styles.eyebrow} ${styles[tone]} ${centered ? styles.centered : ""}`}
    >
      {children}
    </div>
  );
}

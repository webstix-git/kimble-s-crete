import type { ReactNode } from "react";
import styles from "./Heading.module.css";

type HeadingProps = {
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
};

export default function Heading({
  tone = "light",
  className = "",
  children,
}: HeadingProps) {
  return (
    <h2 className={`${styles.heading} ${styles[tone]} ${className}`}>
      {children}
    </h2>
  );
}

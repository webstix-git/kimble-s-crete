import type { ReactNode } from "react";

type IconProps = {
  d?: string;
  size?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  round?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function Icon({
  d,
  size = 24,
  strokeWidth = 2,
  stroke = "currentColor",
  fill = "none",
  round = false,
  className,
  children,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill === "none" ? stroke : undefined}
      strokeWidth={fill === "none" ? strokeWidth : undefined}
      strokeLinecap={round ? "round" : undefined}
      strokeLinejoin={round ? "round" : undefined}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {d && <path d={d} />}
      {children}
    </svg>
  );
}

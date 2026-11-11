import { Link as RouterLink } from "@tanstack/react-router";
import type { ReactNode } from "react";
type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  "data-reveal"?: boolean;
  "data-step"?: string;
};
export function Link({ to, children, ...props }: Props) {
  return to === "/" ? (
    <RouterLink to="/" {...props}>
      {children}
    </RouterLink>
  ) : (
    <RouterLink to="/$" params={{ _splat: to.replace(/^\//, "") }} {...props}>
      {children}
    </RouterLink>
  );
}

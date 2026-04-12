"use client";

import type { PropsWithChildren } from "react";
import { HeadingRoot } from "@/components/common/Heading.styles";

export function Heading({ children }: PropsWithChildren) {
  return <HeadingRoot>{children}</HeadingRoot>;
}

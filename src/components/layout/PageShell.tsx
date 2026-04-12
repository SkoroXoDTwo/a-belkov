"use client";

import type { PropsWithChildren } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Content, Main, Shell } from "@/components/layout/PageShell.styles";
import { SIDEBAR_ITEMS } from "@/shared/config/constants";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <Shell>
      <Sidebar items={[...SIDEBAR_ITEMS]} />
      <Main>
        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}

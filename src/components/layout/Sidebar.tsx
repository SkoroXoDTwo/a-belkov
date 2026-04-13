"use client";

import type { SidebarProps } from "@/components/layout/Sidebar.types";
import { Brand, Nav, NavItem, SidebarRoot } from "@/components/layout/Sidebar.styles";

export function Sidebar({ items }: SidebarProps) {
  return (
    <SidebarRoot>
      <Brand>Belkov</Brand>
      <Nav aria-label="Навигация">
        {items.map((item) => (
          <NavItem key={item.id} href={item.href} $active={Boolean(item.active)}>
            {item.label}
          </NavItem>
        ))}
      </Nav>
    </SidebarRoot>
  );
}

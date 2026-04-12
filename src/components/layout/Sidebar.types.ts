export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
}

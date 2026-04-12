import styled from "styled-components";

export const SidebarRoot = styled.aside`
  width: 232px;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
  border-right: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    min-height: auto;
    padding: ${({ theme }) => theme.spacing.md};
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const Brand = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  letter-spacing: 0.02em;
  color: #f3f4f6;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    overflow-x: auto;
  }
`;

export const NavItem = styled.a<{ $active: boolean }>`
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.sidebarActiveText : theme.colors.sidebarText};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.sidebarActiveBg : "transparent"};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.typography.weights.semibold : theme.typography.weights.medium};
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.sidebarActiveBg : "rgba(255, 255, 255, 0.08)"};
  }
`;

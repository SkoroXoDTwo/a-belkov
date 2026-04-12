import styled from "styled-components";

export const EmptyStateRoot = styled.section`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

export const EmptyDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.md};
`;

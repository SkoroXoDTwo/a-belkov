import styled from "styled-components";

export const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: linear-gradient(145deg, #dce8f3 0%, #f1f5f9 100%);
  overflow: hidden;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Caption = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const DateText = styled.time`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

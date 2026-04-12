import styled from "styled-components";

export const HeadingRoot = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

import styled from "styled-components";

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 232px 1fr;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Content = styled.section`
  max-width: 1320px;
  margin: 0 auto;
`;

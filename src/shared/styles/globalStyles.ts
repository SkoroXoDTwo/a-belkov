import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.pageBg};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: var(--font-primary), ${({ theme }) => theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

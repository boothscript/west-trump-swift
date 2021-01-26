import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  align-content: space-between;
  grid-template-columns: 1fr minmax(400px, 66vw) 1fr;
`;

export const Header = styled.header`
  grid-column: 2 / span 1;
  height: 25vh;
`;
export const Main = styled.main`
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Footer = styled.footer`
  grid-column: 2 / span 1;
  height: 25vh;
`;

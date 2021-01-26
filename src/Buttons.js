import React from 'react';
import styled from 'styled-components';

import { getImage } from './images';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  width: max(15vw);
  svg {
    width: 100% !important ;
    height: auto !important;
  }
`;

export default function Buttons({ personList, handleAnswer }) {
  return (
    <Container>
      {personList.map((person) => {
        return (
          <Button onClick={() => handleAnswer(person)} key={person}>
            {getImage(person)}
          </Button>
        );
      })}
    </Container>
  );
}

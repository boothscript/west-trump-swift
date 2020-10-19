import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  grid-column: 2 / span 1;
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  display: block;
`;

export default function Buttons({ personList, handleAnswer }) {
  return (
    <Container>
      {personList.map((person) => {
        return (
          <Button onClick={() => handleAnswer(person)} key={person}>
            {person}
          </Button>
        );
      })}
    </Container>
  );
}

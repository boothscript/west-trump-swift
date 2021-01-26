import React from 'react';
import styled from 'styled-components';
import { states } from './enums';

const {
  IDLE,
  LOADING_QUOTE,
  WAITING_FOR_ANSWER,
  PROCESSING_ANSWER,
  REVEAL_ANSWER,
  GAME_OVER,
} = states;

const Wrapper = styled.div`
  grid-column: 2 / span 1;
  font-size: 3rem;
  text-align: center;
`;
const Person = styled.img``;
const QuoteText = styled.p``;
const Loading = styled.p``;

export default function Quote({ quote, person, state }) {
  console.log('in quote the state is ', state);
  if (state === WAITING_FOR_ANSWER || PROCESSING_ANSWER) {
    return (
      <Wrapper>
        <Person person={person}></Person>
        <QuoteText>{`"${quote}"` || '...'}</QuoteText>
      </Wrapper>
    );
  }
  if (state === LOADING_QUOTE) {
    return (
      <Wrapper>
        <p>... loading ...</p>
      </Wrapper>
    );
  }
  return <></>;
}

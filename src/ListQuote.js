import React from 'react';
import styled from 'styled-components';

import { getImage } from './images';

const ListQuoteWrapper = styled.div`
  display: flex;
  margin-bottom: 1em;
  align-items: center;
  p {
    margin-block-start: 0;
  }
`;
const ListQuoteImage = styled.div`
  background-image: url('./images/${(props) => props.person}.svg');
  flex-basis: 20%;
  height: 70px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const QuoteWrapper = styled.div`
  flex-basis: 80%;
`;

export default function ListQuote({ round }) {
  console.log({ round });
  return (
    <ListQuoteWrapper key={round.quote}>
      <ListQuoteImage person={round.person} />
      <QuoteWrapper>
        <p>{round.quote}</p>
      </QuoteWrapper>
    </ListQuoteWrapper>
  );
}

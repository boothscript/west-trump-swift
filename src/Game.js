import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Quote from './Quote';
import { getRandomQuote } from './fetchQuotes';
// States
import { states, people } from './enums';
import Buttons from './Buttons';
import useLocalStorageState from './hooks/useLocalStorageState';

const {
  IDLE,
  LOADING_QUOTE,
  WAITING_FOR_ANSWER,
  PROCESSING_ANSWER,
  REVEAL_ANSWER,
  GAME_OVER,
  QUOTE_FAILED,
} = states;

const { TRUMP, SWIFT, WEST } = people;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(400px, 66vw) 1fr;
`;

const LargeTitle = styled.div`
  grid-column: 2 / span 1;
  height: 33vh;
  font-size: 3em;
`;
const H1 = styled.h1`
  margin: auto;
  text-align: center;
`;

const StartButton = styled.div`
  grid-column: 2 / span 1;
  margin: 10vh 0;
`;

const Button = styled.button`
  display: block;
  margin: auto;
  border: none;
  border-radius: 6px;
  background: lightgray;
  font-family: inherit;
  font-size: 1.5em;
  padding: 0.5em 2.5em;
`;

const Score = styled.div`
  grid-column: 2 / span 1;
  text-align: center;
  font-size: 2rem;
`;

const History = styled.div`
  grid-column: 2 / span 1;
  font-size: 1.5rem;
  padding: 0 1em;
  .li {
    list-style: none;
  }
`;

const HighScore = styled.div`
  grid-column: 2 / span 1;
  text-align: center;
  font-size: 1.5rem;
`;

function Game() {
  const [state, setState] = useState(IDLE);
  const [nextQuote, setNextQuote] = useState({});
  const [history, setHistory] = useState([]);
  const [answer, setAnswer] = useState('');
  const [highScore, setHighScore] = useLocalStorageState('high-score', 0);

  const { quote, person } = nextQuote;
  console.log({ person });

  useEffect(() => {
    console.log(history);
    console.log('running use effect');
    if (state === LOADING_QUOTE) {
      getRandomQuote()
        .then((quote) => {
          setNextQuote(quote);
          console.log(quote);
          setState(WAITING_FOR_ANSWER);
        })
        .catch(() => setState(QUOTE_FAILED));
    }
    if (state === QUOTE_FAILED) {
      console.log('error');
      throw new Error();
    }
    if (state === PROCESSING_ANSWER) {
      const historyCopy = history;
      console.log({ history });
      setHistory([
        ...historyCopy,
        { quote, person, answer: answer === person },
      ]);
      console.log({ answer }, { person });
      console.log(answer === person);
      setAnswer('');
      setNextQuote({});
      setState(REVEAL_ANSWER);
    }
    if (state === REVEAL_ANSWER) {
      const timeout = setTimeout(() => {
        if (history[history.length - 1].answer) {
          setState(LOADING_QUOTE);
        } else {
          setState(GAME_OVER);
        }
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (state === GAME_OVER) {
      if (history.length - 1 > highScore) {
        setHighScore(history.length - 1);
      }
    }
  }, [state]);

  function handleAnswer(person) {
    setAnswer(person);
    setState(PROCESSING_ANSWER);
  }

  if (state === IDLE) {
    return (
      <Container>
        <HighScore>
          <p>High Score: {highScore}</p>
        </HighScore>
        <LargeTitle>
          <H1>Trump, West or Swift?</H1>
        </LargeTitle>
        <StartButton>
          <Button onClick={() => setState(LOADING_QUOTE)}>Start</Button>
        </StartButton>
      </Container>
    );
  }
  if (state === LOADING_QUOTE || state === WAITING_FOR_ANSWER) {
    return (
      <Container>
        <HighScore>
          <p>High Score: {highScore}</p>
        </HighScore>
        <LargeTitle>
          <H1>Trump, West or Swift?</H1>
        </LargeTitle>
        <Score>
          <p>Score: {history.length || 0}</p>
        </Score>
        <Quote quote={quote} person={person} state={state} />
        <Buttons
          personList={[TRUMP, SWIFT, WEST]}
          handleAnswer={handleAnswer}
        />
      </Container>
    );
  }
  if (state === REVEAL_ANSWER) {
    return (
      <Container>
        <HighScore>
          <p>High Score: {highScore}</p>
        </HighScore>
        <LargeTitle>
          <H1>Trump, West or Swift?</H1>
        </LargeTitle>
        <Quote quote={quote} person={person} state={state} />
        <Score>
          <p>{history[history.length - 1].answer ? 'correct' : 'false'}</p>
        </Score>
      </Container>
    );
  }
  if (state === GAME_OVER) {
    return (
      <Container>
        <HighScore>
          <p>High Score: {highScore}</p>
        </HighScore>
        <LargeTitle>
          <H1>Trump, West or Swift?</H1>
        </LargeTitle>
        <Score>
          <p>game over</p>
        </Score>
        <Score>You scored: {history.length - 1}</Score>
        <StartButton>
          <Button
            onClick={() => {
              setHistory([]);
              setState(IDLE);
            }}
          >
            TRY AGAIN
          </Button>
        </StartButton>
        <History>
          <ul>
            {history.map((round) => {
              return <li key={round.quote}>{round.quote}</li>;
            })}
          </ul>
        </History>
      </Container>
    );
  }
  return (
    <Container>
      <LargeTitle>
        <H1>Trump, West or Swift?</H1>
      </LargeTitle>
    </Container>
  );
}

export default Game;

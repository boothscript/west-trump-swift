import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Quote from './Quote';
import { getRandomQuote } from './fetchQuotes';
// States
import { states, people } from './enums';
import Buttons from './Buttons';
import ListQuote from './ListQuote';
import useLocalStorageState from './hooks/useLocalStorageState';
import { Container, Header, Main, Footer } from './layoutComponents';

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

const LargeTitle = styled.div`
  grid-column: 2 / span 1;
  font-size: 3em;
`;
const SmallTitle = styled.div`
  grid-column: 2 / span 1;
  font-size: 1.5em;
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
      console.log('in loading state');
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
      }, 1000);
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

  // render
  switch (state) {
    case IDLE:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
          </Header>
          <Main>
            <LargeTitle>
              <H1>Trump, West or Swift?</H1>
            </LargeTitle>
            <StartButton>
              <Button onClick={() => setState(LOADING_QUOTE)}>Start</Button>
            </StartButton>
          </Main>
          <Footer></Footer>
        </Container>
      );
    case LOADING_QUOTE:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
            <SmallTitle>
              <H1>Trump, West or Swift?</H1>
            </SmallTitle>
            <Score>
              <p>Score: {history.length || 0}</p>
            </Score>
          </Header>
        </Container>
      );
    case WAITING_FOR_ANSWER:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
            <SmallTitle>
              <H1>Trump, West or Swift?</H1>
            </SmallTitle>
            <Score>
              <p>Score: {history.length || 0}</p>
            </Score>
          </Header>
          <Main>
            <Quote quote={quote} person={person} state={state} />
            <Buttons
              personList={[TRUMP, SWIFT, WEST]}
              handleAnswer={handleAnswer}
            />
          </Main>
          <Footer></Footer>
        </Container>
      );
    case REVEAL_ANSWER:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
            <SmallTitle>
              <H1>Trump, West or Swift?</H1>
            </SmallTitle>
            <Score>
              <p>Score: {history.length || 0}</p>
            </Score>
          </Header>
          <Main>
            <Score>
              <p>{history[history.length - 1].answer ? 'correct' : 'false'}</p>
            </Score>
          </Main>
          <Footer></Footer>
        </Container>
      );
    case GAME_OVER:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
            <SmallTitle>
              <H1>Trump, West or Swift?</H1>
            </SmallTitle>
          </Header>
          <Main>
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
          </Main>
          <History>
            <ul>
              {history.map((round) => {
                return <ListQuote round={round} />;
              })}
            </ul>
          </History>
        </Container>
      );
    default:
      return (
        <Container>
          <Header>
            <HighScore>
              <p>High Score: {highScore}</p>
            </HighScore>
            <SmallTitle>
              <H1>Trump, West or Swift?</H1>
            </SmallTitle>
          </Header>
        </Container>
      );
  }
}

export default Game;

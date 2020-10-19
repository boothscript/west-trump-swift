import { people } from './enums';

const { TRUMP, WEST, SWIFT } = people;

const apiCalls = {
  WEST: 'https://api.kanye.rest/',
  TRUMP: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random',
  SWIFT: 'https://api.taylor.rest/',
};

function pickPerson() {
  const people = [TRUMP, WEST, SWIFT];
  const rndNum = Math.floor(Math.random() * 3);
  return people[rndNum];
}

function fetchQuote(person) {
  return fetch(apiCalls[person])
    .then((resp) => resp.json())
    .then((data) => data.message || data.quote)
    .catch((error) => {
      throw error;
    });
}

function getRandomQuote() {
  return new Promise((resolve, reject) => {
    const person = pickPerson();
    fetchQuote(person)
      .then((quote) => {
        resolve({ person, quote });
      })
      .catch((error) => reject());
  });
}

export { getRandomQuote };

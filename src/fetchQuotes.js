import { people } from './enums';

const { TRUMP, WEST, SWIFT } = people;

function pickPerson() {
  const people = [TRUMP, WEST, SWIFT];
  const rndNum = Math.floor(Math.random() * 3);
  return people[rndNum];
}

function fetchQuote(person) {
  if (person === TRUMP) {
    return fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
      .then((resp) => resp.json())
      .then((data) => data.message)
      .catch((error) => {
        throw error;
      });
  }
  if (person === WEST) {
    return fetch('https://api.kanye.rest/')
      .then((resp) => resp.json())
      .then((data) => data.quote)
      .catch((error) => {
        throw error;
      });
  }
  if (person === SWIFT) {
    return fetch('https://api.taylor.rest')
      .then((resp) => resp.json())
      .then((data) => data.quote)
      .catch((error) => {
        throw error;
      });
  }
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

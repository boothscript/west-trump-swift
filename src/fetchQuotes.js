import { people } from './enums';

const { TRUMP, WEST, SWIFT } = people;

function resolveFake() {
  console.log('in return fake');
  return { person: 'Kanye', quote: 'This is a test quote' };
}

function pickPerson() {
  const people = [TRUMP, WEST, SWIFT];
  const rndNum = Math.floor(Math.random() * 3);
  return people[rndNum];
}

function fetchQuote(person) {
  if (person === TRUMP) {
    return fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random')
      .then((resp) => resp.json())
      .then((data) => data.message);
  }
  if (person === WEST) {
    return fetch('https://api.kanye.rest/')
      .then((resp) => resp.json())
      .then((data) => data.quote);
  }
  if (person === SWIFT) {
    return fetch('https://api.taylor.rest')
      .then((resp) => resp.json())
      .then((data) => data.quote);
  }
}

function getRandomQuote() {
  return new Promise((resolve, reject) => {
    const person = pickPerson();
    fetchQuote(person).then((quote) => {
      resolve({ person, quote });
    });
  });
}

export { getRandomQuote };

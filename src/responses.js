const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

const respond = (request, response, content, type, status) => {
  response.writeHead(200, { 'Content-Type': type });
  if (status === 'HEAD') {
    response.writeHead(200, { 'Content-Length': status });
  }
  response.write(content);
  response.end();
};

const getRandomJoke = (request, response, max, acceptedTypes, httpMethod) => {
  const random = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[random];

  const jokeXML = {
    q: jokes[random].q,
    a: jokes[random].a,
  };

  if (httpMethod === 'HEAD') {
    return respond(request, response, JSON.stringify(randomJoke), 'application/json', httpMethod);
  }

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
        <joke>
            <q>${jokeXML.q}</q>
            <a>${jokeXML.a}</a>
        </joke>
    
    `;
    return respond(request, response, responseXML, 'text/xml', httpMethod);
  }

  return respond(request, response, JSON.stringify(randomJoke), 'application/json', httpMethod);
};

const getRandomJokes = (request, response, max, acceptedTypes, httpMethod) => {
  const random = Math.floor(Math.random() * jokes.length);

  const randomJokeArray = [];

  const jokeXML = {
    q: jokes[random].q,
    a: jokes[random].a,
  };

  const responseXML = `
      <jokes>
        <joke>
          <q>${jokeXML.q}</q>
          <a>${jokeXML.a}</a>
        </joke>
      <jokes>
  `;

  if (acceptedTypes[0] === 'text/xml') {
    for (let i = 0; i < max; i++) {
      randomJokeArray.push(jokes[random - i]);
    }

    return respond(request, response, responseXML, 'text/xml', httpMethod);
  }
  for (let i = 0; i < max; i++) {
    randomJokeArray.push(jokes[random - i]);
  }

  return respond(request, response, JSON.stringify(randomJokeArray), 'application/json', httpMethod);
};

module.exports.getRandomJoke = getRandomJoke;
module.exports.getRandomJokes = getRandomJokes;

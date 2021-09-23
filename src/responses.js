
const jokes = [
    { "q": "What do you call a very small valentine?", "a": "A valen-tiny!" },
    { "q": "What did the dog say when he rubbed his tail on the sandpaper?", "a": "Ruff, Ruff!" },
    { "q": "Why don't sharks like to eat clowns?", "a": "Because they taste funny!" },
    { "q": "What did the boy cat say to the girl cat?", "a": "You're Purr-fect!" },
    { "q": "What is a frog's favorite outdoor sport?", "a": "Fly Fishing!" },
    { "q": "I hate jokes about German sausages.", "a": "Theyre the wurst." },
    { "q": "Did you hear about the cheese factory that exploded in France?", "a": "There was nothing left but de Brie." },
    { "q": "Our wedding was so beautiful ", "a": "Even the cake was in tiers." },
    { "q": "Is this pool safe for diving?", "a": "It deep ends." },
    { "q": "Dad, can you put my shoes on?", "a": "I dont think theyll fit me." },
    { "q": "Can February March?", "a": "No, but April May" },
    { "q": "What lies at the bottom of the ocean and twitches?", "a": "A nervous wreck." },
    { "q": "Im reading a book on the history of glue.", "a": "I just cant seem to put it down." },
    { "q": "Dad, can you put the cat out?", "a": "I didnt know it was on fire." },
    { "q": "What did the ocean say to the sailboat?", "a": "Nothing, it just waved." },
    { "q": "What do you get when you cross a snowman with a vampire?", "a": "Frostbite" },
];




const getRandomJoke = ( request, response, params, acceptedTypes) => {
   
    max = params
    max = Number(max);
    max = !max ? 10 : max;
    max = max < 10 ? 10 : max;

    const random = Math.floor(Math.random() * jokes.length);
    const randomJoke = jokes[random];

    const jokeXML = {
        q: jokes[random].q,
        a: jokes[random].a,
    };

   

 
    
    if (acceptedTypes === 'text/xml') { 
        console.log('myNinjaWemadeIt');
        const responseXML = `
        <joke>
            <q>${jokeXML.q}</q>
            <a>${jokeXML.a}</a>
        </joke>
    
    `;
        return respond(request, response, responseXML, 'text/xml');
    }



    return JSON.stringify(randomJoke);
};

const getRandomJokes = (params, request, response, acceptedTypes) => {
    max = params;
    max = Number(max);
    max = !max ? 2 : max;
    max = max < 2 ? 2 : max;


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

    if(acceptedTypes === 'text/xml'){
        for (let i = 0; i < max; i++) {
            
            return respond(request, response, responseXML, 'text/xml');
        }
    }else if(acceptedTypes == undefined){
        for (let i = 0; i < max; i++) {
            const random = Math.floor(Math.random() * jokes.length);
            randomJokeArray.push(jokes[random]);
        }
    }
    




    return JSON.stringify(randomJokeArray);
}




const getRandomJokeResponse = (request, response, params, acceptedTypes) => {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Type': 'text/xml' });
    response.write(getRandomJoke());
    response.end();
};

const getRandomJokesResponse = (request, response, params, acceptedTypes) => {
    response.writeHead(200, { 'Content-Type': 'application/json' , 'Content-Type': 'text/xml'});
    response.write(getRandomJokes(params.max));
    response.end();

};
const respond = (request, response, content, type) => {
    response.writeHead(200, { 'Content-Type': type });
    response.write(content);
    response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
module.exports.getRandomJokesResponse = getRandomJokesResponse;
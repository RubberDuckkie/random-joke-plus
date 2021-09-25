// console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 5 - here's our 404 page

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
// const getRandomNumberJSON = (max=1) => {
//   max = Number(max);
//   max = !max ? 1 : max;
//   max = max < 1 ? 1 : max;
//     const number = Math.random() * max;
//     const responseObj = {
//       timestamp: new Date(),
//       number: number
//     };
//     return number;
// };

const urlStruct = {
  GET: {
    '/random-joke': responseHandler.getRandomJoke,
    '/random-jokes': responseHandler.getRandomJokes,
    notFound: htmlHandler.get404Response,
    '/joke-client': htmlHandler.getJokeClientResponse,

  },
  HEAD: {
    '/random-joke': responseHandler.getRandomJoke,
    '/random-jokes': responseHandler.getRandomJokes,
    notFound: htmlHandler.get404Response,

  },

};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

  // console.log("parsedUrl=", parsedUrl);
  // console.log("pathname=", pathname);
  const httpMethod = request.method;
  const params = query.parse(parsedUrl.query);
  const { max } = params;

  if (httpMethod === 'HEAD') {
    console.log('So yes Head?');
    getBinarySize(pathname);
    urlStruct[httpMethod][parsedUrl.pathname](request, response, max, acceptedTypes, httpMethod);
  } else if (httpMethod === 'GET') {
    urlStruct[httpMethod][parsedUrl.pathname](request, response, max, acceptedTypes, httpMethod);
  } else {
    urlStruct[httpMethod].notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);

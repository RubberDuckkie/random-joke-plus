const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/random-joke': responseHandler.getRandomJoke,
    '/random-jokes': responseHandler.getRandomJokes,
    notFound: htmlHandler.get404Response,
    '/joke-client': htmlHandler.getJokeClientResponse,
    '/': htmlHandler.get404Response,
  },
  HEAD: {
    '/random-joke': responseHandler.getRandomJoke,
    '/random-jokes': responseHandler.getRandomJokes,
    notFound: htmlHandler.get404Response,

  },

};

const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const httpMethod = request.method;
  const params = query.parse(parsedUrl.query);
  const { max } = params;

  if (httpMethod === 'HEAD' || 'GET') {
    urlStruct[httpMethod][parsedUrl.pathname](request, response, max, acceptedTypes, httpMethod);
  } else {
    urlStruct[httpMethod].notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);

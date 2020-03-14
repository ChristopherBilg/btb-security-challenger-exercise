/* jshint esversion: 8 */

const fs = require('fs');
const request = require('request');

const baseUrl = 'https://challenger.btbsecurity.com';
const authUrl = `${baseUrl}/auth`;
const eventsUrl = `${baseUrl}/get-events`;
const minimumEventId = 1;
const maximumEventId = 4390;
const eventsJsonFile = 'public/events_raw.json';
let authCode = null;

const getAuthCode = (url, callback) => {
  // Check the the given url is non-null
  if (url === null) {
    console.log('Error: parameter \'url\' must be non-null');
    return;
  }

  // Since the url is non-null, make a request to it
  request({
    url: url,
    headers: {
      'Host': 'challenger.btbsecurity.com',
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
      'TE': 'Trailers',
    },
  }, (error, response, body) => {
    // Check that no errors were reported in the request
    if (error !== null) {
      console.error('Request error:', error);
      return;
    }

    // Check that the response was a status code 200 (success)
    const responseCode = response.statusCode;
    if (responseCode !== 200) {
      console.error(`Request error: status code should be 200, but was ${responseCode}`);
      return;
    }

    // Save the authentication/authorization code and log it to console
    authCode = body;
    console.log('Auth code:', authCode);

    // 'Return' the callback function, since request() is async
    callback(eventsUrl, authCode);
  });
};

const getEventData = (url, code) => {
  // Check that the given url is non-null
  if (url === null || code === null) {
    console.error('Error: parameters (url, code) must be non-null');
    return;
  }

  // Remove the events file if it exists
  fs.unlink(eventsJsonFile, (error) => {
    if (error) {
      console.error('Error:', error);
    }
  });

  // Since the url is non-null, make a request to it
  for (let counter = minimumEventId; counter < maximumEventId; counter += 10) {
    request({
      url: `${url}?from=${counter}&to=${counter+9}`,
      headers: {
        'Host': 'challenger.btbsecurity.com',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:74.0) Gecko/20100101 Firefox/74.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
        'TE': 'Trailers',
        'Authorization': `${code}`,
      },
      json: true,
    }, (error, response, body) => {
      // Check that no errors were reported in the request
      if (error !== null) {
        console.error('Request error:', error);
        return;
      }

      // Check that the response was a status code 200 (success)
      const responseCode = response.statusCode;
      if (responseCode !== 200) {
        console.error(`Request error: status code should be 200, but was ${responseCode}`);
        return;
      }

      // Write events to disk syncronously, create file if non-existent
      body.forEach((element) => {
        fs.appendFileSync(eventsJsonFile, JSON.stringify(element) + '\n', 'utf8');
      });
    });
  }

  return;
};

getAuthCode(authUrl, getEventData);

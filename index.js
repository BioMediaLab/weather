const { send } = require('micro');
const http = require('request');
const qs = require('querystring');
const url = require('url');

function getWeather(location) {

  return new Promise( function (resolve, reject) {

    http(
      {
        method: 'GET',
        uri: 'http://api.openweathermap.org/data/2.5/weather?q=' + location +',US&APPID=d5ffb9a0c0f2f58afaec4824ebd295d8',
      },
      function (error, response, body) {
        if (error) {
          reject(error);
        }
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
      }
    );
  })
}

module.exports = async function (req, res) {
  const query = qs.parse(url.parse(req.url).query);
  const weather = await getWeather(query.location);
  return weather;
}

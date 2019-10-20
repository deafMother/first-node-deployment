const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/5d769fa948d6c8095608335d810b917d/' +
    latitude +
    ',' +
    longitude +
    '?exclude=minutely,hourly,alerts,flags';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to server', undefined);
    } else if (body.error) {
      callback('Please try another location', undefined);
    } else {
      callback(
        undefined,
        ` the temp is ${body.currently.temperature}, rain chance: ${body.currently.precipProbability}. ${body.daily.data[0].summary}`
      );
    }
  });
};

module.exports = getWeather;

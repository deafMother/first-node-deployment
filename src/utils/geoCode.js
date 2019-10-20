const request = require('request');

// // geocoding
// const geoKey =
//   'pk.eyJ1Ijoic2Fyb3ZhcjEyMzQ1NiIsImEiOiJjazFvenRmMG0wcncxM21xZGQwaXI2eHFlIn0.R2broykviidzKvI1HGIfmg';

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoic2Fyb3ZhcjEyMzQ1NiIsImEiOiJjazFvenRmMG0wcncxM21xZGQwaXI2eHFlIn0.R2broykviidzKvI1HGIfmg';

  request(
    { url, json: true },
    (error, { body: { features } }) => {
      // destructuring the response
      if (error) {
        callback('Unable to connect to server', undefined);
      } else if (features.length === 0) {
        callback(
          'unable to find location. Try another search',
          undefined
        );
      } else {
        callback(undefined, {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          location: features[0].place_name
        });
      }
    }
  );
};

module.exports = geoCode;

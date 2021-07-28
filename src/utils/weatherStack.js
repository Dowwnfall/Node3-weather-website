const request = require('postman-request');
const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=66c346f0bc8400bf49d929b4b271c7b6&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=f`
  request({url, json: true}, (error, {body}) => {
    if( error) {
      callback('Unable to connect to weather service!', undefined);
    } else if(body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. it is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees out.`);
    }
  });
}
module.exports = forecast;

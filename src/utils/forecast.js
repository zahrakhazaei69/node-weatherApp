const request = require('request');

const forecast = (longtitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/421428a794fb0c350449114a82a4bf1c/${longtitude},${latitude}`;
    request({url, json: true}, (error, {body}) => {

        if(error){
            callback('no connection', undefined);

        } else if(body.error){
            callback('try another location', undefined);

        } else {
            callback(undefined, `${body.currently.summary} and max temp is ${body.currently.summary}`);

        }
    });

};

module.exports = forecast;
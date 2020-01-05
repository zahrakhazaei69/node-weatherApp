const request = require('request');

const geoCode = (address, callback)  => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiemtoOTgiLCJhIjoiY2s0dGtrMTk2MDRtaDNqcGpxN2Zua3dxNyJ9.mtKaTmWzffI96nfc6QlJfA&limit=1`;
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            console.log('internet');
            callback('unable to reach resources', undefined);

        } else if(body.features[0].length === 0){
            console.log('not found');
            callback('unable to find your request', undefined);

        } else {
            //const res = response.body.features[0];
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            });
        }
    });
};
module.exports = geoCode;
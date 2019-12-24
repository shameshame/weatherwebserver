const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = "https://api.darksky.net/forecast/c89aa5aff2b1701c3b7dba0590565bb5/" + latitude + ',' + longitude +"?units=si";

    request({url, json: true }, (error, { body }) => {
        if (error)
            callback("Hello, buddy ! It looks like you are not connected to your network", undefined);
        else if (body.error)
            callback("Check your coordinates and try again", undefined);

        else
            callback(undefined,body.daily.summary + " It is currently " + body.currently.temperature + " degrees out. There is " +
                body.currently.precipProbability + " % of rain.");
      })


}



module.exports = forecast;
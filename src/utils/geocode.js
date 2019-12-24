const request = require("request");



const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoidmFzZWtwdXBraW4iLCJhIjoiY2szdHo2eWcwMDdrcjNsbzM4Z3hnYzI4dCJ9.1MpBy2gmxinkVPvWQ4E8_Q&limit=1";

    request({ url, json: true }, (error, {body}) => {
        if (error)
            callback("Hello, buddy ! It looks like you are not connected to your network", undefined);
        else if (body.message)
            callback(body.message);

        else if (body.features.length === 0)
            callback("Unable to bring forecast for the requested location", undefined);
        else
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1]  ,
                longitude: + body.features[0].center[0]
                });
    })

}


module.exports = geocode;
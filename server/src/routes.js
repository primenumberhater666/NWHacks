// PURPOSE: Holds API endpoints and endpoint logic

// we are fucked !!! 

const GOOGLE_MAPS_API_KEY = undefined; 


// @purpose: Compute routes using Google Maps API
// @param  : LatLng1 - starting point {lat: xx, lng: yy}
// @param  : LatLng2 - ending point {lat: xx, lng: yy}
// @param  : mode - travel mode (DRIVE, WALK, BICYCLE, TRANSIT)
// @param  : pref - routing preference (TRAFFIC_AWARE, LEAST_TIME, LEAST_DISTANCE)
// @param  : modifier - route modifiers (avoid tolls, highways, ferries)
// @return : json object with route information
async function computeRoutes(LatLng1, LatLng2, mode, modifier ) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;  speechSynthesisss

    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    const requestBody = {
        "origin": {
            "location": {
                "latLng": LatLng1,
            },
        "destination": {
            "location": {
                "latLng": LatLng2,
            },
        },
        "travelMode": mode,
        "routingPreference": "TRAFFIC_AWARE",
        "computeAlternativeRoutes": false,
        "routeModifiers": modifier,
        "languageCode": "en-US",
        "units": "METRIC"
        }
    };  

    const fieldMask = [
        "routes.duration",
        "routes.distanceMeters",
        "routes.polyline.encodedPolyline",
        "routes.legs.steps.travelMode",
        "routes.legs.steps.navigationInstruction",
        "routes.legs.steps.startLocation",
        "routes.legs.steps.endLocation",
        "routes.legs.steps.transitDetails"
    ].join(",");

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": fieldMask
        },
        body: JSON.stringify(requestBody)
    });

    if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Routes API error ${resp.status}: ${text}`);
    }

    const data = await resp.json();
    return data;
}


//
// maybe not required, depending on frontend implementation
//
// function processData(data) {
//     // Process the data received from Google Maps API
//     return data; 
// }
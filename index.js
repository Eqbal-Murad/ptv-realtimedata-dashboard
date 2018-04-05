const crypto = require('crypto');
const assert = require('assert');
const request = require('request');

const baseURL = 'https://timetableapi.ptv.vic.gov.au';

let  URI = '/v3/departures/route_type/1/stop/2104/route/958?max_results=3&expand=Provide%20multiple%20values%20in%20new%20lines.&devid=3000343';
let hmac = crypto.createHmac('sha1', '948c1a5b-bb7d-4301-9ecd-2874de928aeb');
			hmac.update(URI);
let signature = hmac.digest('hex');
let API_URL = baseURL+URI+'&signature='+signature;
let error, response, body;
let realTimeData;

    console.log(API_URL);

      request(API_URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log(info)

            for (let i of info.departures) {
                if(i.estimated_departure_utc != null) {
                    realTimeData = i.estimated_departure_utc ;
                    break;
              }
            }

           console.log("estimated_departure_utc :" + realTimeData);
          //Verify that response departures array contain atleast one realTimeData attribute
          assert.notEqual(realTimeData, null,'Expected Real Time Data data but not avaiable' );


         }
      })

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request');
var events = require('events');
var fh = require('fh-mbaas-api');

function bpmRoute() {
  var bpm = new express.Router();
  bpm.use(cors());
  bpm.use(bodyParser());

  bpm.post('/', function(req, res) {
    console.log(new Date(), 'In bpm route POST / req.body=', req.body);
    var world = req.body && req.body.bpm ? req.body.bpm : 'BPM';
    return submitToBPM(req.body, function(error, response, body){
      return res.json(body);  
    });
  });

  return bpm;
}

function submitToBPM(submission, cb){

    //var url = 'http://50.251.20.51:8080/business-central/rest/runtime/com.redhat.demos:BuildEntAppIn60Min:3.0/withvars/process/project1.SummitDemo/start';
    var url = 'http://' +
                process.env.BPM_HOST +
                ':' + process.env.BPM_PORT +
                '/business-central/rest/runtime/' +
                process.env.BPM_DEPLOYMENT_ID +
                '/withvars/process/' +
                process.env.BPM_PROCESS_DEF_ID +
                '/start';

    console.log(new Date(), 'calling BPMSuite REST API', url);
    console.log(JSON.stringify(submission.submission.formFields, null, 4));

    // FH Form field codes mapped to corresponding BPM process variables
    var mappings = {
      'PolicyHolderName': 'map_driversName',
      'PolicyHolderEmail': 'map_driversEmail',
      'PolicyHolderPhone': 'map_driversPhone',
      'PolicyNumber': 'map_driversPolicy',
      'DriversLicenseNumber': 'map_driversLicense',
      'VehicleYear': 'map_vehicleYear',
      'VehicleMake': 'map_vehicleMake',
      'VehicleModel': 'map_vehicleModel',
      'VehicleColor': 'map_vehicleColor',
      'VehicleLicensePlate': 'map_vehicleLicense',
      'AccidentDate': 'map_claimDate',
      'AccidentLocation': 'map_claimLocation',
      'AccidentDescription': 'map_claimDescription'
    };
    
    var params = {};
    // parse out fields from submission
    for (var key in mappings) {
        getFromFormFields(key);
    }
    console.log(params);

    function getFromFormFields(fieldCode) {

        // find fieldCode in fields and return it's value
        for (var i in submission.submission.formFields) {
            var currentField = submission.submission.formFields[i];

            if (currentField.fieldId.fieldCode === fieldCode) {
                params[mappings[fieldCode]] = currentField.fieldValues[0];
                //console.log(params);
            }
        }
    }

    request.post({ 
      url: url, 
      auth : {
          'user':process.env.BPM_USER,
          'pass':process.env.BPM_PASSWORD,
          sendImmediately : true
      },
      qs: params
      /*
      qs: {
              map_driversName: 'Maggie',
              map_driversEmail: 'mhu@redhat.com',
              map_driversLicense: 'CA-12345',
              map_driversPhone: '987-65-4321',
              map_driversPolicy: 'ABC54321',
              map_vehicleMake: 'Porsche',
              map_vehicleColor: 'Yellow',
              map_vehicleLicense: 'RWUATP',
              map_claimDate: '06/09/2015',
              map_claimLocation: 'Orange',
              map_claimDescription: 'Hit a bunch of clowns!'
              }
      */
    }, cb);
}

var submissionEventListener = new events.EventEmitter();
submissionEventListener.on('submissionComplete', function(submission){
  console.log('New submission received: ');
  console.log(submission);
  return submitToBPM(submission, function(error, response, body){
      console.log('Received response from jBPM in event handler: ' + response.statusCode);
      console.log(body);
  });
});
fh.forms.registerListener(submissionEventListener, function(err){});

module.exports = bpmRoute;

'use strict';

module.exports = function(Keycluster) {
//     const request = require('request');
    Keycluster.status = function(cb, response) {
        var RandomOrg = require('random-org');
        var response;

        var random = new RandomOrg({ apiKey: "64df9e64-d7ff-462b-9813-3e6608744d3e" });
        random.generateStrings({ n: 1, length: 25, characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" })
        .then(response = function(result) {
            var response = result.random.data;
            console.log(response); 
            cb(null ,response);
            //return response;
        });
        // console.log(response)
        // return response;
    //cb(null, response);
    };

    Keycluster.remoteMethod('status', {
        http: {path: '/status', verb: 'post'},
        returns: {arg: 'status', type: 'string'}
    });

    // Keycluster.remoteMethod('status',{
    //     accepts: {arg: 'response', type: 'string'},
    //     returns: {arg: 'key', type: 'string'},
    //     http: {path: '/status', verb: 'post'}
    //   });
};

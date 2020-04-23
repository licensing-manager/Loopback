'use strict';

module.exports = function(License) {

    License.observe('before save', async function generateLicneseKeys(ctx, next) {
        if (ctx.instance) {
            var RandomOrg = require('random-org');
            var licenses;
            var random = new RandomOrg({ apiKey: "64df9e64-d7ff-462b-9813-3e6608744d3e" });
            await random.generateStrings({ n: ctx.instance.num, length: 25, characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" })
            .then(function(result) {
                licenses = result.random.data;
                ctx.instance.licenses = licenses;
                //cb(null, result.random.data);
            });      
        }
        next();
    });

    License.status = function(license_n, cb) {
        var RandomOrg = require('random-org');
        var random = new RandomOrg({ apiKey: "64df9e64-d7ff-462b-9813-3e6608744d3e" });
        random.generateStrings({ n: license_n, length: 25, characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" })
        .then(function(result) {
            cb(null, result.random.data);
        });
        
    };

    License.remoteMethod(
        'status', {
          http: {
            path: '/status',
            verb: 'post'
          },
          accepts: {
              arg: 'license_n',
              type: 'number'
          },
          returns: {
            arg: 'licenses',
            type: [ 'string' ]
          }
        }
      );

    // License.find({include: ['id', 'licenses']}, function() { /* ... */ });
};

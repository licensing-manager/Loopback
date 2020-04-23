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

      License.verify = function(license_key, product_s, cb) {
        let filter={
            where: {
                    licenses: license_key,
                    product: product_s
                   },
        }
        License.find(filter, function(license_model) {
            if (license_model) {
                var exp_date = new Date(license_model[0].expiration_date);
                var today = new Date();

                console.log(exp_date);
                console.log(today);
                if (exp_date > today) {
                    cb(null, true);
                }
            }
            cb(null, false);
        });
        
      }

      License.remoteMethod(
        'verify', {
          http: {
            path: '/verify',
            verb: 'get'
          },
          accepts: [ {
              arg: 'license_key',
              type: 'string'
             },
             {
                 arg:'product',
                 type: 'string'
             }
            ],
          returns: {
            arg: 'verified',
            type: 'Boolean'
          }
        }
      );
};

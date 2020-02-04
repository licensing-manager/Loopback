'use strict';
var installed = true;
module.exports = function(app) {

if(!installed){
 var Role = app.models.Role;
  var User = app.models.User;
  var RoleMapping = app.models.RoleMapping;


  User.create([
    {username: 'admin', email: 'admin@admin.com', password: 'admin'},
  ], function(err, users) {
    if (err) throw err;
    console.log("Created User: ",users);

    //create the admin role 8:51
    Role.create({
      name: 'adminstrator'
    }, function(err, role) {
      if (err) throw err;

      //make admin at 5:26
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        console.log("Created principal: ",principal);
      });
    });
  });


}







};


module.exports =  function(app) {
  app.get('/', function(req, res) {
    res.send({msg: 'hello'});
  });
}

// https://www.toptal.com/angular/angular-6-jwt-authentication

var request = require('supertest');
var server = require('./../server.js');
var app = server.app;

describe('/', function() {
  it('test status code 200', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
});
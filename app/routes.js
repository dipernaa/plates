// app/routes.js
var Plate = require('./models/Plate.js');

module.exports = function(app) {
  app.route('/')
    .get(function(req, res) {
      res.render('index.ejs');
    });

  app.route('/:state/:plateNumber')
    .get(function(req, res) {
      var data = {
        state: req.params.state.toUpperCase(),
        number: req.params.plateNumber.toUpperCase()
      };

      Plate.findOne(data, function(err, plate) {
        //send to 500
        if (err) throw err;

        if (plate) {
          res.render('plate.ejs', { plateInfo: plate });
        } else {
          var newPlate = new Plate(data);
          newPlate.save(function(err) {
            //send to 500
            if (err) throw err;

            res.render('plate.ejs', { plateInfo: newPlate });
          });
        }
      });
    })
    .post(function(req, res) {
      Plate.findById(req.body.plateId, function(err, plate) {
        if (err) throw err;

        if (plate) {
          plate.messages.push(req.body.message);
          plate.save(function(err) {
            //send to 500
            if (err) throw err;

            res.send('weee');
          });
        } else {
          res.send('oops');
        }
      });
    });

  app.get('/*', function(req, res) {
    res.render('404.ejs');
  });
};
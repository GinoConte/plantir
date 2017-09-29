'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Garden = require('../model/gardens');
var Tile = require('../model/tiles');
var TileType = require('../model/tiletypes');
var Schema = mongoose.Schema;

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
//var port = process.env.API_PORT || 3001;
var port = 3001;

//mongodb://admin:admin@ds135514.mlab.com:35514/plantir-db
var mongoDB = 'mongodb://admin:admin@ds135514.mlab.com:35514/plantir-db';
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

//NOT USED -- DEMO PURPOSES ONLY
//adding the /comments route to our /api router
router.route('/comments')
  //retrieve all comments from the database
  .get(function(req, res) {
    //looks at our Comment Schema
    Tile.find(function(err, comments) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })
  //post new comment to the database
  .post(function(req, res) {
    var comment = new Tile();
    //body parser lets us use the req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully added!' });
    });
  });


//NOT USED -- DEMO PURPOSES ONLY
router.route('/comments/:garden_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
 .put(function(req, res) {
   Tile.findById(req.params.garden_id, function(err, tile) {
     if (err)
       res.send(err);
     //setting the new author and text to whatever was changed. If nothing was changed
     // we will not alter the field.
     (req.body.author) ? tile.author = req.body.author : null;
     (req.body.text) ? tile.text = req.body.text : null;
     //save comment
     tile.save(function(err) {
       if (err)
         res.send(err);
       res.json({ message: 'Comment has been updated' });
     });
   });
 })
 //delete method for removing a comment from our database
 .delete(function(req, res) {
   //selects the comment by its ID, then removes it.
   Tile.remove({ _id: req.params.garden_id }, function(err, tile) {
     if (err)
       res.send(err);
     res.json({ message: 'Comment has been deleted' })
   })
});


//POST -- CREATE NEW GARDEN TOKEN
//GET  -- RETRIEVE LIST OF ALL GARDENS
router.route('/garden')
  	.get(function(req, res) {
    	Garden.find(function(err, gardens) {
    		if (err)
        		res.send(err);
      		//responds with a json object of our database gardens
      		res.json(gardens)
    	});
  	})
	//post new garden
	.post(function(req, res) {
    	var garden = new Garden({
    		_id: new mongoose.Types.ObjectId(),
    		location: 'Sydney'
    		//location: req.body.location;
    	});
    	//garden.location = req.body.location;
    	console.log(garden._id);

    	garden.save(function(err) {
      		if (err)
        	res.send(err);


        	//loop to add 5 tiles for demo purposes
        	for (var i=0; i<25; i++) {
        		//change to brick for demo purposes
        		var tiletypeobject = mongoose.Types.ObjectId("59cb40fa9b7ea709e92b151a")
        		if([2,3,7,8].includes(i)) {
        			tiletypeobject = mongoose.Types.ObjectId("59cb41419b7ea709e92b151c")
        		} 
	        	var emptytile = new Tile({
	    			_id: new mongoose.Types.ObjectId(),
	        		parentgarden: garden._id,
	        		//add grass as default tiletype on new garden creation
	        		tiletype: tiletypeobject,
	        		tileprops: {
	        			soiltype: "Loam",
	        			ph: 5,
	        			sunlight: "Moderate",
	        			moisture: "Moderate"
	        		}
	        	});
	        	emptytile.save(function (err) {
	        		if (err) 
	        		res.send(err);

	        	})
	        }

      		res.json({ message: 'Garden created!',
      			       gardenid: garden._id });
    	});
});

router.route('/garden/:garden_id')
//The put method gives us the chance to update our comment based on the ID passed to the route
  	.get(function(req, res) {
		Garden.findById(req.params.garden_id, function(err, garden) {
  			if (err)
  				res.send(err);
  			res.json(garden)
  		});
  	})
	.put(function(req, res) {
		Garden.findById(req.params.garden_id, function(err, garden) {
    		if (err)
    		res.send(err);
        	//setting the new author and text to whatever was changed. If nothing was changed
       		// we will not alter the field.
        	(req.body.location) ? garden.location = req.body.location : null;
            //save comment
        	garden.save(function(err) {
            	if (err)
            	res.send(err);
            	res.json({ message: 'Garden location has been updated' });
        	});
    	});
 	})
 	//delete method for removing a comment from our database
 	.delete(function(req, res) {
    	//selects the comment by its ID, then removes it.
   		Garden.remove({ _id: req.params.garden_id }, function(err, garden) {
     		if (err)
       		res.send(err);
     		res.json({ message: 'Garden has been deleted' })
  		})
});

//GET -- RETRIEVE ALL TILES BELONGING TO A SINGLE GARDEN-ID
router.route('/garden/:garden_id/findtiles')
  	.get(function(req, res) {
		Tile.find( {parentgarden: req.params.garden_id}, function(err, tiles) {
  			if (err)
  				res.send(err);
  			res.json(tiles)
  		});
});

//POST -- CREATE A NEW TOKEN WITH PARENT GARDEN
router.route('/tile')
	.post(function(req, res) {
    	var tile = new Tile({
    		_id: new mongoose.Types.ObjectId(),
    		parentgarden: Schema.Types.ObjectId(req.body.parentgarden),
    		tiletype: Schema.Types.ObjectId(req.body.tiletype),
    		tileprops: {
    			soiltype: req.body.soiltype,
    			ph: req.body.ph,
    			sunlight: req.body.sunlight,
    			moisture: req.body.moisture
    		}
    		//location: req.body.location;
    	});
    	tile.save(function(err) {
      		if (err)
        	res.send(err);

      		res.json({ message: 'Tile created!',
      			       tileid: tile._id });
    	});
});

//POST -- CREATE NEW TILETYPE | TAKES: name(string), isplant(bool), tilecolour(#ffffff)
//GET
router.route('/tiletype')
	.post(function(req, res) {
    	var tiletype = new TileType({
    		_id: new mongoose.Types.ObjectId(),
    		name: req.body.name,
    		altname: "Default",
    		isplant: req.body.isplant,
    		info: "Default",
    		tilecolour: req.body.tilecolour,
    		davesgardenid: -1,
    		//location: req.body.location;
    	});
    	tiletype.save(function(err) {
      		if (err)
        	res.send(err);

      		res.json({ message: 'Tiletype created!',
      			       tiletypeid: tiletype._id });
    	});
});

//GET -- RETRIEVE TILETYPE FROM KNOWN IDS
//USED WHEN CREATING DEFAULT GRASS TILES
router.route('/tiletype/:tiletype_id')
  	.get(function(req, res) {
		TileType.findById(req.params.tiletype_id, function(err, tiletype) {
  			if (err)
  				res.send(err);
  			res.json(tiletype)
  		});
});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
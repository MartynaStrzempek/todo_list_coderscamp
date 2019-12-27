var express = require('express');
var router = express();
var bodyParser = require("body-parser");
var mongo = require('mongodb');


var mongoose = require('mongoose');

router.engine('ejs', require('ejs').renderFile);
router.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost/toDoList");
mongoose.set('useFindAndModify', false);

var todoSchema = new mongoose.Schema({
  name: String
});

var Todo = mongoose.model('Todo', todoSchema);

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page and get all to do's. */
router.get('/', function (req, res, next) {
  Todo.find({}, function (err, toDoList) {
    if (err) console.log(err);
    else {
      res.render("index.ejs", { toDoList: toDoList })
    }
  })
});


//post
router.post("/newtodo", function(req, res){
  console.log("item added");
  var itemName = new Todo({
    name: req.body.item
  });
  Todo.create(itemName, function(err, Todo){
    if(err) console.log(err);
    else {
      console.log("Added: " + itemName);
    }
  })  
  res.redirect("/");
})


/* DELETE selected to do item*/
router.post('/delete', function (req, res) {
  var itemName = req.body.name;
  Todo.findOneAndRemove({ name: itemName }, function (err, todo) {
    if (err) console.log(err)
    else res.redirect('/');
  });
});


module.exports = router;
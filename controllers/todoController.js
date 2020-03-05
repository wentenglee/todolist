var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://wentenglee:wentenglee@test-5f5qe.mongodb.net/test?retryWrites=true&w=majority');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    //console.log('get/todo:req.body', req.body)
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
      //console.log('get/todo:data', data)
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //console.log('post/todo:req.body', req.body)
    var itemOne = Todo(req.body).save(function(err, data) 
    {

      if (err) throw err;
      res.json(data);
      //console.log('post/todo:data', data)
    });
  });

  app.delete('/todo/:item', function(req, res) {
    Todo.find({item: req.params.item.replace(/-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}

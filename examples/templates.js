
var views = require('co-views');
var koa = require('..');
var app = koa();

// setup views

var render = views('examples/templates', {
  ext: 'ejs'
});

// dummy data

var user = {
  name: {
    first: 'Tobi',
    last: 'Holowaychuk'
  },
  species: 'ferret',
  age: 3
};

// logger

app.use(function *logger(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// render

app.use(function *(){
  this.body = yield render('user', { user: user });
})

app.listen(4000);

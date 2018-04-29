const express  = require('express');
var app = express();
const body_parser = require('body-parser');

var port = process.env.PORT || 3000;

app.use(body_parser.urlencoded( {extended : true, parameterLimit : 1 }));
app.use(body_parser.json());
app.set('views', './views');
app.set('view-engine', 'ejs');

require('./routes/index')(app);


app.listen(port, function(){
    console.log("Listening..");
});


const express  = require('express');
var app = express();
const body_parser = require('body-parser');



app.use(body_parser.urlencoded( {extended : true, parameterLimit : 1 }));
app.use(body_parser.json());
app.set('views', './views');
app.set('view-engine', 'ejs');

require('./routes/index')(app);


app.listen(3000, function(){
    console.log("Listening..");
});


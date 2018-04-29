module.exports = function(app){
    app.get('/',(req,res)=>{
        console.log('/');
        //res.render('index.ejs', { outer : 'Welcome'});
        res.redirect('/api/ttt');
    });

    require('./main')(app);
};
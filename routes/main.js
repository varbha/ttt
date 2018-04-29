module.exports = function (app) {

    var mainController = require('../controllers/mainController');

    app.get('/api/ttt', (req, res) => {

        const fs = require('fs');
        const request = require('request');

        request('http://terriblytinytales.com/test.txt', function (err, resp, body) {
            console.log('LOG: Request recieved');
            fs.writeFile('ttt.txt', body, { encoding: 'utf-8' }, function (err) {
                if (!err) {
                    console.log("LOG: No error, file written");

                    // redundant read
                    fs.readFile('ttt.txt', { encoding: 'utf-8' }, function (err, data) {
                        console.log("LOG: Reading file");
                        if (!err) {
                            //console.log(data);
                            console.log('LOG: File read check complete');
                            mainController.runExtraction(data, function (freqMap) {
                                console.log("Extraction completed");

                                res.render('index.ejs', {outer:'TTT', retrieval : 'text retrieved from http://terriblytinytales.com/test.txt', word : 'word extraction complete.'});

                                //frequencyDict is now availaible in mainController object
                                //console.log(mainController.frequencyDict);
                            });

                        }

                    });
                }
            });
        });
    });


    app.post('/main', mainController.extractFrequency)


}
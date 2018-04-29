/*
* This controller contains two different functions for extraction of words:
* 1. runExtraction_request (function callback => void)
*** This method first fetches the file data from the URL, and then extracts the words
*** It does not use the ttt.txt file stored in the server directory.
*** Not dependent on the pseudo *middleware* function in routes/main.js because it does not access the ttt.txt

* 2. runExtraction_fs (data : String, function callback =>void)
*** This method uses the ttt.txt file written to the server by the routes/main.js pseudo *middleware*
*** Similar to a database retrieval, to be used when data is not to be accessed using request module, but from locally stored data
*** data read using routes/main.js is sent to this function, where it extracts the words.
*/
const fs = require('fs');

function runExtraction_request(cb) {
    console.log('in extraction');
    const request = require('request');
    request('http://terriblytinytales.com/test.txt', function (err, resp, body) {
        //console.log(body);
        let countFrequency = {};
        let body = data.replace(/[-.,?/]/g, '').split(/\s+/);
        body.forEach(function (word) {
            if (!countFrequency[word]) {
                countFrequency[word] = 0;
            }
            countFrequency[word] += 1;
        });
        //console.log(countFrequency);

        //expose frequencyDict to exports
        module.exports.frequencyDict = countFrequency;

        cb(countFrequency);

    });
}

function runExtraction_fs(data, cb) {
    console.log('in extraction');

    //console.log(body);
    let countFrequency = {};
    let body = data.replace(/[-.,?/]/g, '').split(/\s+/);
    //console.log(body);
    body.forEach(function (word) {
        if (!countFrequency[word]) {
            countFrequency[word] = 0;
        }
        countFrequency[word] += 1;
    });
    //console.log(countFrequency);

    //expose frequencyDict to exports
    module.exports.frequencyDict = countFrequency;

    cb(countFrequency);

}

function extractFrequency(req, res) {
    if (req.body) {
        //console.log(req.body.n);
        let sortedArray = [];
        for(var word in module.exports.frequencyDict){
            sortedArray.push([word, module.exports.frequencyDict[word]]);
        }

        //inplace sorting
        sortedArray.sort((a,b)=>{
            return b[1] - a[1];
        });
        //console.log(sortedArray);

        let NmostFrequent = [];
        
        if(req.body.n > sortedArray.length) req.body.n = sortedArray.length;
        
        //blocking for
        for (let i = 0;i<req.body.n; i++){
            NmostFrequent.push(sortedArray[i]);
        }
        //console.log(NmostFrequent);
        res.json({"solution" : NmostFrequent});
    }
}


module.exports = {
    runExtraction: runExtraction_fs, //can be changed
    extractFrequency: extractFrequency /* ,
    frequencyDict : countFrequency
    */
}
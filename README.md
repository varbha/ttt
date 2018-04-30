# ttt
### Heroku deployed : [here](https://ttt-varun-bhatia.herokuapp.com/)
Implementation for https://angel.co/terribly-tiny-tales/jobs/274683-software-developer

Backend : [node.js](https://nodejs.org) Frontend : [ejs](https://ejs.com)

### Prerequisites

You should have [node.js](https://nodejs.org) installed, with npm

To deploy it in your heroku container, follow the instructions [here](https://heroku.com)

To see the deployed running application, go [here](https://ttt-varun-bhatia.herokuapp.com/)

### Installing

Do:

```
npm install
```

### Run the app

```
node index
```

or if you have `nodemon` globally installed,

```
nodemon index
```

## Architecture

```
- app.js

- package.json

- routes
  -index.js
  -main.js

- views
  -index.ejs

- controllers
  -MainController.js
```

### Components of code
- root/index.js
```
entry point of the server. Defines the express instance, and initialises the middleware. Listens on proceess PORT or 3000. 

Imports /routes/index.js
```
- root/routes/index.js
``` 
exports the GET request for the homepage. Redirects it to /api/ttt.

Imports /routes/main.js
```

- root/routes/main.js
```
defines functions for GET /api/ttt endpoint. In this, it first fetches the text from .../text.txt and stores it in a file on the server. This was done to mimick a database operation. The write is async. The file is then read once to ensure there is no corruption - again done to mimick databse query reads. This is a redundant read - not required in actual production. After this is done, the functions renders the roots/views/index.ejs.

Imports root/controllers/MainController.js
```

- root/controllers/MainController.js
```
This controller has 2  extraction functions, and they do the same thing. runExtraction_request(callback =>void) extracts the words from thr text file, by making a request to the specified URL, and directly operating on that. 

This makes the earlier file write redundant. This function is a one stop solution, but fails if the URL is invalid/down.

A more modular approach is in runExtraction_fs(data: String, callback => void). 

This function has the data from the file we created in /routes/main.js as a parameter (the data from the redundant read from main.js is passed) and then operated on this data. This is more akin to a data store of records, and more robust to failure. 

Finally, the controller has a function runExtraction(void) to sort the frequencies and pass them to the calling function
```

### Frequency logic

Since this was a relatively small text file, I simply created and object and counted the number of instances after specifying certain conditions in linear time. The key-value pairs were: `'word' : 'frequency'`

This object was then sorted as an Array and returened and array of arrays as : `[['word','frequency]]` in descending order of `frequency`.

### Frontend

I was planning to use Vue.js, but due to time constraints decided to go for standard templating instead, using ejs.

### Tests

There are no test scripts specified, testing was done manually.

- Data Extraction at `/api/ttt`, your command window should display this:
```
                                             LOG: Request recieved
2018-04-29T22:52:14.880528+00:00 app[web.1]: LOG: No error, file written
2018-04-29T22:52:14.882152+00:00 app[web.1]: LOG: Reading file
2018-04-29T22:52:14.882264+00:00 app[web.1]: LOG: File read check complete
2018-04-29T22:52:14.882348+00:00 app[web.1]: in extraction
2018-04-29T22:52:14.884372+00:00 app[web.1]: Extraction completed
```
- On entering the number N in the input and clicking submit, a table should be generated wit `N` entries and 2 columns : `word` and `frequency`

- On clicking `Submit` a XHR request to `/main` should be sent. The reply must have `Content-Type:application/json` and should be an array.

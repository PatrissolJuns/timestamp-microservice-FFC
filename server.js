// This is the main programme

const express = require('express');
const cors = require('cors');
const app = express();

// we set the cors in such a way that the API is remotely testable by FCC 

app.use(cors({optionSuccessStatus: 200})); 

// we set the static public folder
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests 
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('the app is listening on port ' + listener.address().port);
});

// The principal end point
app.get('/api/timestamp/:dateString?', (req, res) => {
  let date;
  let dateStringParams = req.params.dateString;
    if (dateStringParams == undefined)
    {
      date = new Date();
      res.json( 
        {
          unix: date.getTime(), 
          utc: date.toUTCString()
        }
      );
    }
    date = new Date(
        // we check id utc or unix
        /\d+-\d+-\d+/.test(dateStringParams) ? dateStringParams : Number.parseInt(dateStringParams, 10)
    );
    if(isNaN(date.getTime())){
         res.json(
           {
             error: 'Invalid Date'
           }
          );
    }
    res.json( 
      {
        unix: date.getTime(), 
        utc: date.toUTCString()
      } 
    );
});
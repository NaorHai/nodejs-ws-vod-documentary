const express    = require('express'),
      bodyParser = require('body-parser');
      vodDoco    = require('./vod-doco-module');
      moment     = require('moment');
      config     = require('./config');

const app  = express();
const port = process.env.PORT || config.properties.PORT;
const vod  = vodDoco();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.json(vod.greetings());
});

app.get('/getAllDocos', function(req, res) {
    res.json(vod.getAllDocos());
});

app.post('/getDocoDataByName', function(req, res, next) {
    let result = vod.getDocoDataByName(req.body.name);
    result === null ? next() : res.json(result);
});

app.post('/filterDocosByMinYearAndDuration', function(req, res, next) {
    let result = vod.filterDocosByMinYearAndDuration(req.body.year, req.body.duration);
    result === null ? next() : res.json(result);
});

app.all('*', function(req, res) {
    res.json({
        "status":"404",
        "error": "No results found",
        "description": "The data is missing, or your query is invalid.",
        "at": moment().format(config.messageTemplates.TIME_FORMAT)
    });
});

app.listen(port);
console.log(`listening on port ${port}`);
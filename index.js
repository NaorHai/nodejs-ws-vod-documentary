const express    = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      vodDoco    = require('./vod-doco-module'),
      vod        = vodDoco(),
      moment     = require('moment'),
      config     = require('./config'),
      app        = express(),
      port       = process.env.PORT || config.properties.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/assets', express.static(__dirname + '/resources'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) =>{
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/app', (req, res) =>{
    res.json({appName: 'nodejs-ws-vod-documentary',
        createdBy: 'Naor Haimov',
        language: 'NodeJs',
        port: port,
        year: 2017});
});

app.get('/getAllDocos', (req, res, next)=> {
    vod.getAllDocos().then((result) => {
        result.length === 0 ? next() : res.json(result);
    }, (error) => {
        console.log(error);
        next();
    });
});

app.post('/getDocoDataByName', (req, res, next)=> {
    vod.getDocoDataByName(req.body.name).then((result) => {
        result.length === 0 ? next() : res.json(result);
    }, (error) => {
        console.log(error);
        next();
    });
});

app.post('/filterDocosByMinYearAndDuration', (req, res, next)=> {
    vod.filterDocosByMinYearAndDuration(req.body.year, req.body.duration).then((result) => {
        result.length === 0 ? next() : res.json(result);
    }, (error) => {
        console.log(error);
        next();
    });
});

app.all('*', (req, res)=> {
    res.json({
        "status":"404",
        "error": "No results found",
        "description": "The data is missing, or your query is invalid.",
        "at": moment().format(config.messageTemplates.TIME_FORMAT)
    });
});

app.listen(port);
console.log(`listening on port ${port}`);
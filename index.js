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
app.use('/assets', express.static(__dirname + '/resources'));

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

app.get('/getAllDocos', (req, res)=> {
    res.json(vod.getAllDocos());
});

app.post('/getDocoDataByName', (req, res, next)=> {
    let result = vod.getDocoDataByName(req.body.name);
    result === null ? next() : res.json(result);
});

app.post('/filterDocosByMinYearAndDuration', (req, res, next)=> {
    let result = vod.filterDocosByMinYearAndDuration(req.body.year, req.body.duration);
    result === null ? next() : res.json(result);
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
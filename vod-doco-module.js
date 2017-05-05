/**
 * Created by Haimov on 04/05/2017.
 */
Docos = require('./resources/data.json').Doco;

class VOD {

    getAllDocos() { return Docos; }

    getDocoDataByName(name) {
         let index = -1; 
         Docos.find(function(item, i) { 
             if(item.name === name) { 
                 index = i; 
             } 
         });
        return index === -1 ? null : Docos[index];
    }

    filterDocosByMinYearAndDuration(year, duration) {
        let result = [];
        Docos.forEach(function (doco) {
            if (doco.year >= year && doco.duration >= duration) {
                result.push(doco);
            }
        });
        return result.length === 0 ? null : result;
    }

     greetings() {
       return `<!DOCTYPE html>
        <html>
        <head>
        <title>DocoVOD</title>
        </head>
        <body>
        <h1>Welcome To Doco VOD Web Service</h1>
        <h3>Get all docos from VOD (GET no params required):</h3>
        <p><a target="_blank" href="https://nodejs-ws-vod-documentary.herokuapp.com/getAllDocos">
        https://nodejs-ws-vod-documentary.herokuapp.com/getAllDocos</a></p><br>
        <h3>Get doco from VOD by name (POST 'name' param required):</h3>
        <p><a target="_blank" href="https://nodejs-ws-vod-documentary.herokuapp.com/getDocoDataByName">
        https://nodejs-ws-vod-documentary.herokuapp.com/getDocoDataByName</a></p><br>
        <h3>Filter docos by minimum year and duration (POST 'year' and 'duration' params required):</h3>
        <p><a target="_blank" href="https://nodejs-ws-vod-documentary.herokuapp.com/filterDocosByMinYearAndDuration">
        https://nodejs-ws-vod-documentary.herokuapp.com/filterDocosByMinYearAndDuration</a></p><br><br>
        <a target="_blank" href="https://nodejs-ws-vod-documentary.herokuapp.com/app">About this WS</a>
        </body>
        </html>`;
    }
}

module.exports = () =>{
    return new VOD();
};





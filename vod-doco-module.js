/**
 * Created by Haimov on 04/05/2017.
 */
Docos = require('./resources/data.json').Doco;

class VOD {

    static getAllDocos() { return Docos; }

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
}

module.exports = () =>{
    return new VOD();
};





/**
 * Created by Haimov on 04/05/2017.
 */
const mongoose   = require('mongoose'),
      Movies     = require('./vod-data-model'),
      Promise    = require('promise'),
      config    = require('./config');


mongoose.connect(config.properties.MLAB_KEY);
mongoose.connection.on('error', (err) => {
    console.log(`connection error: ${err}`);
    process.exit(1);
});

class VOD {

    getAllDocos() {
    return new Promise( (resolve,reject) =>{
            Movies.find({}, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }

    getDocoDataByName(name) {
    return new Promise( (resolve,reject) =>{
            Movies.find({name: name}, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }

    filterDocosByMinYearAndDuration(year, duration) {
    return new Promise( (resolve,reject) =>{
            Movies.find({year:{$gt: year}, duration:{$gt:duration}}, (err, result) => {
                if (err) reject(err);
                else {
                    console.log(`Got data from db: ${result}`);
                    resolve(result);
                }
            });
        });
    }
}

module.exports = () => {
    return new VOD();
};





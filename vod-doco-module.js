/**
 * Created by Haimov on 04/05/2017.
 */
const mongoose   = require('mongoose'),
      config     = require('./config'),
      Movies     = require('./vod-data-model'),
      Promise    = require('promise');


class VOD {

    getAllDocos() {
        mongoose.connect(config.properties.MLAB_KEY);
        mongoose.connection.on('error', (err) => {console.log(`connection error: ${err}`);});
        return new Promise( (resolve,reject) =>{
            mongoose.connection.once('open', () => {
                Movies.find({}, (err, result) => {
                    if (err) reject(err);
                    else {
                        console.log(result);
                        resolve(result);
                    }
                    mongoose.disconnect();
                });
            });
        });
    }

    getDocoDataByName(name) {
        mongoose.connect(config.properties.MLAB_KEY);
        mongoose.connection.on('error', (err) => {console.log(`connection error: ${err}`);});
        return new Promise( (resolve,reject) =>{
            mongoose.connection.once('open', () => {
                Movies.find({name: name}, (err, result) => {
                    if (err) reject(err);
                    else {
                        console.log(result);
                        resolve(result);
                    }
                    mongoose.disconnect();
                });
            });
        });
    }

    filterDocosByMinYearAndDuration(year, duration) {
        mongoose.connect(config.properties.MLAB_KEY);
        mongoose.connection.on('error', (err) => {console.log(`connection error: ${err}`);});
        return new Promise( (resolve,reject) =>{
            mongoose.connection.once('open', () => {
                Movies.find({year: year, duration: duration}, (err, result) => {
                    if (err) reject(err);
                    else {
                        console.log(result);
                        resolve(result);
                    }
                    mongoose.disconnect();
                });
            });
        });
    }
}

module.exports = () => {
    return new VOD();
};





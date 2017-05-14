/**
 * Created by Haimov on 13/05/2017.
 */
const mongoose   = require('mongoose'),
      schema     = mongoose.Schema,
      config     = require('./config'),

docuMovie = new schema({
        name: {type:String, index:1, required:true, unique:true},
        based: {type:String, required: true},
        duration: {type: Number, required: true},
        year: {type: Number, required: true},
        language: {type: [String], required: true},
        country: {type: [String], required: true},
        cast: [{name: String, role: [String]}]
    }, {collection: 'docuMovies'});

console.log(`required paths: ${docuMovie.requiredPaths()}`);
console.log(`indexes: ${JSON.stringify(docuMovie.indexes())}`);

const DocuMovie = mongoose.model('DocuMovie', docuMovie);
module.exports = DocuMovie;

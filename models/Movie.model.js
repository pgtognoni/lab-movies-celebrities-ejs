const { Schema, model } = require('mongoose');
const Celebrity = require('../models/Celebrity.model')

const MovieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
})

const Movie = model('Movie', MovieSchema)

module.exports = Movie;
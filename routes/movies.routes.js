const router = require("express").Router();
const { findById, findByIdAndDelete } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

router.get('/movies.routes', (req, res, next) => {
    res.render('movies')
})

router.get('/create', async (req, res, next) => {
    const castArr = await Celebrity.find()
    res.render('movies/new-movie', { castArr })
})

router.post('/create', async (req, res, next) => {
    try {
        const newMov = await Movie.create( req.body )
        res.redirect('movies')
    } catch(err) {
        console.log(err)
    }
})

router.get('/movies', async (req,res,next) => {
    try {
        const allMovies = await Movie.find()
        res.render('movies/movies', { allMovies })
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const movie = await Movie.find({_id: req.params.id}).populate('cast')
        res.render('movies/movie-details', {movie})
    } catch(err) {
        console.log(err)
    }
})

router.post('/:id/delete', async (req,res,next) => {
    try {
        const todelete = await Movie.findByIdAndDelete(req.params.id)
        res.redirect('/movies/movies')
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id/edit', async (req,res,next) => {
    try{
        const findOne = await Movie.findById(req.params.id)
        const castArr = await Celebrity.find()
        res.render('movies/edit-movie', { findOne, castArr })
    } catch(err){
        console.log(err)
    }
})

router.post('/:id/edit', async (req,res,next) => {
    try{
        const findUpdate = await Movie.findByIdAndUpdate({_id: req.params.id}, req.body)
        res.redirect('/movies/movies')
    } catch(err){
        console.log(err)
    }
})
module.exports = router;
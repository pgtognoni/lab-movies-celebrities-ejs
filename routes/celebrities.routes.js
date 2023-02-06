const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Celebrity.model");
const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res, next) => {
    res.render('celebrities')
})

router.get('/create', (req, res, next) => {   
    res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
    try {
        const newCel = await Celebrity.create( req.body )
        res.redirect('celebrities')
    } catch(err) {
        console.log(err)
    }
})

router.get('/celebrities', async (req, res, next) => {
    try{
        const allCels = await Celebrity.find()
        res.render('celebrities/celebrities', { allCels })
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const celebrity = await Celebrity.findById(req.params.id)
        console.log(celebrity)
        res.render('celebrities/celebrity-detail', { celebrity })
    } catch(err) {
        console.log(err)
    }
})

router.post('/:id/delete', async (req, res, next) => {
    try {
        const finddelete = await Celebrity.findByIdAndDelete(req.params.id)
        res.redirect('/celebrities/celebrities')
    } catch(err) {
        console.log(err)
    }
})

router.get('/:id/edit', async (req,res,next) => {
    try {
        const find = await Celebrity.findById(req.params.id)
        res.render('celebrities/celebrity-edit', { find })
    } catch (err){
        console.log(err)
    }
})

router.post('/:id/edit', async (req,res,next) => {
    try {
        const findOne = await Celebrity.findByIdAndUpdate({_id: req.params.id}, req.body)
        res.redirect('/celebrities/celebrities')
    } catch(err) {
        console.log(err)
    }
})

module.exports = router;
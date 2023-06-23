const express = require('express')
const moviesController = require('../Controllers/moviesController')

const route = express.Router()

route.param('id', moviesController.checkId)

route.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody, moviesController.addMovie)

route.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = route
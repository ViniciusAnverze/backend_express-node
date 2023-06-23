const fs = require('fs')

const movies = JSON.parse(fs.readFileSync('./data/movies.json'))

exports.validateBody = (req, res, next) => {
    
    if(!req.body.name || !req.body.releaseYear){
        return res.status(400).json({
            status: 'failed',
            message: 'You informed an invalid body'
        })
    }

    next()
}

exports.checkId = (req, res, next, value) => {

    const movieToUpdate = movies.find((element) => {return element.id === Number(value)})

    if(!movieToUpdate){
        return res.status(404).json({
            status: 'failed',
            message: 'no movie with id '+value+' was found'
        })
    }

    next()
}

exports.getAllMovies = (req, res) => {
    res.status(200).json({
        status: 'succes',
        currentTime: req.currentTime,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

exports.getMovie = (req, res) => {
    const id = Number(req.params.id)

    let movie = movies.find((element) => {return element.id === id})

    res.status(200).json({
        status: 'succes',
        data: {
            movie: {
                movie
            }
        }
    })
}

exports.updateMovie = (req, res) => {
    const id = Number(req.params.id)
    const movieToUpdate = movies.find((element) => {return element.id === id})

    const index = movies.indexOf(movieToUpdate)

    Object.assign(movieToUpdate, req.body)
    movies[index] = movieToUpdate

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 'succes',
            data: {
                movie: movieToUpdate
            }
        })
    })
}

exports.deleteMovie = (req, res) => {
    const id = Number(req.params.id)
    const movieToDelete = movies.find((element) => {return element.id === id})

    const index = movies.indexOf(movieToDelete)

    movies.splice(index, 1)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: 'succes',
            data: {
                movie: null
            }
        })
    })
}

exports.addMovie = (req, res) => {
    const newId = movies[movies.length - 1].id + 1
    const newMovie = Object.assign({"id": newId}, req.body)
    
    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json(newMovie)
    })
}
const express = require('express')
const morgan = require('morgan')
const moviesRoutes = require('./Routes/moviesRoutes')

const app = express()

function log(req, res, next){
    console.log('custom middleware')
    next()
}

app.use(express.json())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.static('./public'))
app.use(log)
app.use((req, res, next) => {
    req.currentTime = new Date()
    next()
})


app.use('/api/v1/movies', moviesRoutes)

module.exports = app


//CONTINUAR NO VÍDEO 47
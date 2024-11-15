// This simple node.js server app makes use of the Uni Helsinki 
// FullStackOpen course example app phonebook-app.
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Data = require('./models/data')

app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/data/:id', (request, response, next) => {
    const id = request.params.id
    Data.findOne({username: id})
        .then(data => {
            if (data) {
                response.json(data)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/data/:id', (request, response, next) => {
    const id = request.params.id
    const data = JSON.stringify(request.body.data)

    Data.findOneAndUpdate(
        {username: id}, 
        { data: data }, 
        { new: true, upsert: true, runValidators: true }
    )
        .then(storedData => {
            if (storedData) {
                response.status(201).json(storedData)
            } else {
                console.log('PUT: not able to fetch updated data?')
            }}
        )
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log('Validation error: ' + error.message)
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
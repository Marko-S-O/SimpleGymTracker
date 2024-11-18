// Retrieve and store the data from DB via node server.
// This simple node.js application makes use of the Uni Helsinki FullStackOpen course example app.                                                                              
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Data, User } = require('./models/data')
const bcrypt = require('bcrypt')

app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

const validateToken = (request, uid) => {
    let tokenOk = false
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const encodedToken = authorization.replace('Bearer ', '')
        const idInToken = jwt.verify(encodedToken, process.env.SECRET)
        tokenOk = idInToken && idInToken == uid
    } 
    return tokenOk
}

app.get('/api/data/:uid', (request, response, next) => {

    const uid = request.params.uid
    if(!validateToken(request, uid)) {
        console.log('token validation failed: ' + request.get('authorization'))   
        return response.status(401).json({ error: 'token invalid' })
    }

    Data.findOne({username: uid})
        .then(data => {
            if (data) {
                response.json(data)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/data/:uid', (request, response, next) => {

    const uid = request.params.uid
    if(!validateToken(request, uid)) {
        console.log('token validation failed: ' + request.get('authorization'))   
        return response.status(401).json({ error: 'token invalid' })        
    }

    const data = request.body.data
    data.token = '' // never save the token to db
    const dataJSON = JSON.stringify(data)

    Data.findOneAndUpdate(
        {username: uid}, 
        { data: dataJSON }, 
        { new: true, upsert: true, runValidators: true }
    )
        .then(storedData => {
            if (storedData) {
                response.status(201).json(storedData)
            } else {
                console.log('ERROR: PUT not able to fetch updated data?')
            }}
        )
        .catch(error => next(error))
})

// We take a bit of shortcut here: since the post method is not used for other purposes and 
// we don't want a user to have to re-login and we are storing the token to the local storage, 
// we dedicate the POST method of /api/data for login/automatic user creation
app.post('/api/data', async (request, response, next) => {
    const { username, password } = request.body

    try {
        let passwordCorrect = false
        let newUser = false
        let user = await User.findOne({username: username})

        // If user not found, create a new one
        if(user == null) {
            newUser = true
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)        
            user = new User({
                username, 
                passwordHash
            })
            await user.save()
            passwordCorrect = true
        } else {
            // valdate password 
            passwordCorrect = await bcrypt.compare(password, user.passwordHash)
        }
        
        if(passwordCorrect) {
            // Create the token. Tokens don't expire.   
            const token = jwt.sign(username, process.env.SECRET) 
            const responseCode = newUser ? 201 : 200
            response.status(responseCode).send({ token, userId: user.username })        
        } else {
            // return failed code
            return response.status(401).json({error: 'invalid password'})
        }
    } catch(error) {
        console.log('Failed validating or creating a user')
        next(error)
    }

    
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log('Validation error: ' + error.message)
        return response.status(400).json({ error: error.message })
    } else {
        console.log('Unknown error' + error.message)
    }
    next(error)
}

app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
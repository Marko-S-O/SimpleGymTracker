const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://mongouser:mongopassword@localhost:3456/gymtracker_db?authSource=admin'
console.log('connecting to', MONGO_URL)

mongoose.connect(MONGO_URL)
    // eslint-disable-next-line
    .then(result => {
        console.log('connected DB')
    })
    .catch((error) => {
        console.log('error connecting DB', error)
    })

const dataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    data: {
        type: String, // storing all data as a JSON string
        required: true
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String
})


dataSchema.set('toJSON', {  
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {  
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Data = mongoose.model('Data', dataSchema)
const User = mongoose.model('User', userSchema)

module.exports = {
    Data,
    User
}
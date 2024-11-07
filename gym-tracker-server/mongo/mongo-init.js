const testData = require('../test/testData')

// eslint-disable-next-line
db = db.getSiblingDB('gymtracker_db')

// eslint-disable-next-line
db.createUser({user: 'mongouser', pwd: 'mongopassword', roles: [{role: 'dbOwner', db: 'gymtracker_db', },],})

// eslint-disable-next-line
db.createCollection('datas')

// eslint-disable-next-line
db.datas.insert(testData.data)
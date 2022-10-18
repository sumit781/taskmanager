const mongoose=require('mongoose')

let db={}

mongoose.pormise=global.Promise
db.mongoose=mongoose

db.USERS=require('../schemas/user')
db.TASKS=require('../schemas/task')

module.exports = db


const mongo = require('mongoose')

var schema = new mongo.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String
    },
    waddress:{
        type : String,
        unique : true
    }

}) 

const investorDB  = mongo.model('investordb',schema)

module.exports = investorDB
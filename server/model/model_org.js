const mongo = require('mongoose')

var schema2 = new mongo.Schema({
    org_name : {
        type : String,
        required : true
    },
    org_desc : {
        type : String,
    },
    waddress : {
        type : String,
        unique : true
    },
    org_req_fund : {
        type : Number,
    },
    org_fund_date:{
        type : Date
    },
    fund_raised:{
        type : Number,
        default : 0,
    },
    org_email : {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String
    },
    view_count:{
        type : Number
    }
})

const orgDB = mongo.model('orgdb',schema2)
module.exports = orgDB
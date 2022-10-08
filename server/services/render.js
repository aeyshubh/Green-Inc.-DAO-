const axios = require("axios");
const { response } = require("express");

exports.renderHome = (req,res)=>{
    res.render("index");
}

exports.renderLogin = (req,res)=>{
    res.render("investor/login")
}

exports.renderOrgLogin = (req,res)=>{
    res.render("org/login")
}
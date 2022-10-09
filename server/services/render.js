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

exports.renderLogout = (req,res)=>{
    req.session.destroy();
    res.redirect("/")
}

//Fetch Orgs for Donating
exports.renderOrgsList = (req,res)=>{
    if(req.session.investor_name != ''){
        axios.get("http://localhost:3000/api/org").then(function(org_lists){
            //console.log(org_lists.data)
            res.render("investor/org_list",{iname:req.session.investor_name,org_list:org_lists.data})
        })
    }
    else{
        res.render('/').send({messsage:"User not logged in."})
    }
}

//Fetch Orgs for Voting
exports.renderOrgsVote = (req,res)=>{
    if(req.session.investor_name != ''){
        axios.get("http://localhost:3000/api/org").then(function(org_lists){
            //console.log(org_lists.data)
            res.render("investor/vote_org_list",{iname:req.session.investor_name,org_list:org_lists.data})
        })
    }
    else{
        res.render('/').send({messsage:"Org_user not logged in."})
    }
}

exports.renderOrgsDetail = (req,res)=>{
    if(req.session.org_name != ''){
        axios.get("http://localhost:3000/api/org",{params:{id:req.session.org_id}}).then(function(org_lists){
            res.render("org/org_details",{org_list:org_lists.data})
         })
     }
    else{
        res.render('/').send({messsage:"Org_user not logged in."})
    }
}

exports.renderDonationForm = (req,res)=>{
    axios.get('http://localhost:3000/api/org',{params:{id:req.query.id}}).then(function(data){
        res.render('investor/donation',{org_data : data.data})
    }).catch(err=>{
        res.send(err);
    })
}
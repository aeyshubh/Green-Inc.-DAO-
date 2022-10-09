const investorDB = require('../model/model');
const orgDB = require('../model/model_org');


//create and save new investor
exports.create = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }

    //new user
    const investor = new investorDB({
        name : req.body.name,
        email : req.body.email,
        password : req.body.pass1,
        waddress : '',
    })
    console.log(req.body)   
    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;


    if(pass1 == pass2){
    //save user in DB
        investor
            .save(investor)
            .then(data=>{
                //res.send(data)
                res.redirect('/investor_login')
            }).catch(err=>{
                res.status(500).send({message:err.message||"some error occur while creating investor"})
            })
    }
    else{
        res.status(500).send({message:"Password Does not match"})
        return;
    }
}

//create and save new Organization
exports.createOrg = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }
    //new org
    const org = new orgDB({
        org_name : req.body.org_name,
        org_desc : ' ',
        waddress : req.body.org_wadd,
        org_req_fund : 0,
        org_fund_date : '',
        fund_raised : 0 ,
        org_email : req.body.org_email,
        password : req.body.pass1,
        view_count : 0
    })
    
    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;


    if(pass1 == pass2){
    //save org in DB
        org
            .save(org)
            .then(data=>{
                //res.send(data)
                res.redirect('/org_login')
            }).catch(err=>{
                res.status(500).send({message:err.message||"some error occur while creating organization"})
            })
    }
    else{
        res.status(500).send({message:"Password Does not match"})
        return;
    }
}

//to validate INvestor
exports.findInvestor = async (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }
    let iname = req.body.email;
    let ipass = req.body.pass;

    const data = await investorDB.findOne({email:iname,password:ipass});
    console.log(data);
    if(!data){
        res.status(500).send({message:"User Does not exist"})
    }else{
        req.session.investor_name = data.name
        console.log(req.session.investor_name)
        res.redirect("/investor_orgs")
    }
}


//to validate Organisation
exports.findOrg = async (req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }
    let iname = req.body.email;
    let ipass = req.body.pass;

    const data = await orgDB.findOne({email:iname,password:ipass});
    console.log(data);
    if(!data){
        res.status(500).send({message:"Org Does not exist"})
    }else{
        req.session.org_name = data.org_name
        req.session.org_id = data._id
        console.log(req.session.org_name)
        res.redirect("/organisation_details")
    }
}

//retrive and return single user as well all 
exports.listOrg = (req,res)=>{

    if(req.query.id){
        let id  = req.query.id;
        orgDB.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message:"Organisation does not exist"})
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message:err.message || "some error occurred in finding User."})
        })

    }else{
        orgDB.find().then(orgs=>{
            res.send(orgs)
        }).catch(err=>{
            res.status(500).send({message:err.message||"some error occur while finding user"})
        })
    }
}

//to update a Organisation by ID
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"content cannot be updated"})
        return
    }
    let id  = req.params.id;
    
    orgDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update as ${id} may not be present`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message:'some error occured while updating user'})
    })
}

exports.incrementOrgVote = (req,res)=>{
    let wallet = req.params.w_address;
    orgDB.updateOne({waddress:wallet},{$inc : {view_count :1} }).then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update as ${id} may not be present`})
        }else{
            res.send(data)
        }
    })
}


//to delete a user by ID
exports.delete = (req,res)=>{
    let id = req.params.id;
    userDB.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message:`cannot find user by ID:${id}`})
        }
        else{
            res.send({messsage:'User deleted successfully!'})
        }
    })
}

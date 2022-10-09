const express = require('express');
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/control')

/*
* @description RootRoute
* @method GET /
*/
route.get('/',services.renderHome);

route.get('/investor_login',services.renderLogin);
route.get('/org_login',services.renderOrgLogin);
route.get('/logout',services.renderLogout);
route.get('/investor_orgs',services.renderOrgsList);
route.get('/investor_vote',services.renderOrgsVote);
route.get('/donation_form',services.renderDonationForm);
route.get('/organisation_details',services.renderOrgsDetail);


//api calls
route.post('/api/investor',controller.create)
route.post('/api/org',controller.createOrg)
route.post('/api/auth/investor',controller.findInvestor)
route.post('/api/auth/org',controller.findOrg)
route.get('/api/org',controller.listOrg)
route.put('/api/org/:id',controller.update)
route.put('/api/org/inc_vote/:w_address',controller.incrementOrgVote)

module.exports = route
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

//api calls
route.post('/api/investor',controller.create)
route.post('/api/org',controller.createOrg)
route.post('/api/auth/investor',controller.findInvestor)
route.post('/api/auth/org',controller.findOrg)
route.get('/api/org',controller.listOrg)

module.exports = route
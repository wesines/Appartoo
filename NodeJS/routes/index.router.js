const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlPagolin = require('../controllers/pagolin.Controller');


router.post('/register', ctrlPagolin.register);
router.post('/authenticate', ctrlPagolin.authenticate);
router.get('/pagolinProfile',jwtHelper.verifyJwtToken, ctrlPagolin.pagolinProfile);
router.put('/editPangolin/:id',jwtHelper.verifyJwtToken, ctrlPagolin.editPangolin);

router.get('/listPagolin',jwtHelper.verifyJwtToken, ctrlPagolin.listPagolin);

router.delete('/deletepagolin/:id', jwtHelper.verifyJwtToken,ctrlPagolin.deletepagolin);

module.exports = router;

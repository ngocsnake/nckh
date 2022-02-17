const express = require('express');
const router = express.Router();
const ProvinceController = require('../app/controllers/API/Province');
const DataCovid = require('../app/controllers/API/DataCovid');

router.get('/province', ProvinceController.index);
router.get('/datacovid', DataCovid.index);

module.exports = router;

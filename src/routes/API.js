const express = require('express');
const router = express.Router();

const tinhThanhPho = require('../app/controllers/API/Province');

router.get('/province', tinhThanhPho.index);

module.exports = router;
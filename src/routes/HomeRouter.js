const express = require('express');
const router = express.Router();

const HomeController = require('../app/controllers/HomeController');

router.get('/', HomeController.test);

module.exports = router;
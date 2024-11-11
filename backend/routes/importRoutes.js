const express = require('express');
const router = express.Router();
const { importHealthItems } = require('../controllers/importController');

router.post('/health-items', importHealthItems);

module.exports = router; 
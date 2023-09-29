const express = require('express');
const { route } = require('.');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

module.exports = router;
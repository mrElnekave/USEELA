const { all_users, get_user, sign_up_user, login_user, delete_user, update_user } = require('../controllers/user_controller');
const express = require('express');
const User = require('../models/User');

// router is a mini express app
const router = express.Router();

router.get('/', all_users);
router.get('/:id', get_user); // '/:id' since I am dealing with existing users
router.post('/signup', sign_up_user);
router.post('/login', login_user);
router.delete('/:id', delete_user);
router.patch('/:id', update_user);

module.exports = router;
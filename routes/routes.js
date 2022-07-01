const router = require('express').Router();
const { CreateUser, UserLogin } = require('../controller/userController');

router.post('/signup', CreateUser);
router.post('/signin', UserLogin);

module.exports = router;
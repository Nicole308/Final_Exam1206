const express= require('express');
const router = express.Router();
const { isAuth } = require('../authentication');

router.get('/', (req, res) => {
    res.render('login.pug');
});

router.get('/dashboard', isAuth, async(req, res) => {
    res.render('index.pug');
});

router.get('/register', (req, res) => {
    res.render('register.pug');
});

module.exports = router;
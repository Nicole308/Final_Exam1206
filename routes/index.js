const express= require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login.pug');
});

router.get('/dashboard', async(req, res) => {
    res.render('index.pug');
});

router.get('/register', (req, res) => {
    res.render('register.pug');
});

module.exports = router;
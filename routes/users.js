const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { isAuth } = require('../authentication');

router.get('/register', async(req, res) => {
    res.render('register.pug');
});

router.post('/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await prisma.user.create({
            data: {
                userName: req.body.userName,
                password: hashedPassword
            }
        });
        console.log(user);
        res.redirect('/')
    } catch (err) {
        res.redirect('/register')
    }
    
});

router.get('/', async(req, res) => {
    res.render('login.pug');
});

router.post('/', async(req, res) => {
    const userName = req.body.userName;
    const user = await prisma.user.findFirst({ where: { userName } });
    if(user == null){
        return res.status(400).send('username cannot be found');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password))
        {
            req.session.user = user;
            console.log(user);
            //session.user = user
            res.redirect('/list/add');
            
        } 
        else 
        {
            res.send("Login failed!");
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/dashboard', isAuth, async(req, res) => {
    const lists = await prisma.list.findMany({});
    res.render('index.pug', { lists });
});

// Logout function
router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
          //res.send('Logout successful')
          res.redirect('/')
        }
      });
    } else {
      res.end()
    }
  })

module.exports = router;
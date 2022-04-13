const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { isAuth } = require('../authentication');

router.get('/add', isAuth, async(req, res) => {
    res.render('add_list.pug');
});

router.get('/dashboard', isAuth, async(req, res) => {
    res.render('/dashboard');
});

router.post('/add', isAuth, async(req, res) => {
    const name = req.body.name;
    const member = req.body.member;
    try {
        const list = await prisma.list.create({
            data: {
                name: name,
                member: req.body.member
            }
        });
        console.log(list);
        res.redirect('/users/dashboard');
        // await prisma.member.create({
        //     list: {
        //         connect: {
        //             id: list.id
        //         }
        //     },
        //     user: {
        //         connect: {
        //             id: user.id
        //         }
        //     }
        // });
        
    } catch (error) {
        res.status(404).send("Error creating list");
    }
});

router.get('/view', isAuth, async(req, res) => {
    res.render('view.pug');
});

module.exports = router;
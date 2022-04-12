const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/add', async(req, res) => {
    res.render('add_list.pug');
});

router.get('/dashboard', async(req, res) => {
    res.render('/dashboard');
});

router.post('/add', async(req, res) => {
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

module.exports = router;
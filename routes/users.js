const express= require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
            console.log(user);
            //session.user = user
            res.redirect('/dashboard');
            
        } 
        else 
        {
            res.send("Login failed!");
        }
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/dashboard', async(req, res) => {
    const lists = await prisma.list.findMany({});
    res.render('index.pug', { lists });
});

async function checkExist(req, res, next) {
    const username = await prisma.user.findUnique({
        where: {
            userName: req.body.username
        },
        select: {
            userName: true
        }
    });
    res.username = username;
    return next();
}

// catch 404 and forward to error handler
router.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;

	//pass error to the next matching route.
	next(err);
});

// handle error, print stacktrace
router.use(function (err, res) {
	res.status(err.status || 500);

	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = router;
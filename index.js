const express = require('express')
const app = express()
const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view-engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const listRouter = require('./routes/list')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});
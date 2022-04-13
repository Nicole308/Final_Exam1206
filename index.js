const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')

// Tells express to use files located in the views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view-engine', 'pug')	
// For the server to allow access on pug syntax

app.use(express.json()) 	// For the app to accept json format
app.use(express.urlencoded({ extended: false }))	// Makes the server accept input forms
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: false
}))

// Routes connecting to routes folder 
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const listRouter = require('./routes/list')

// Using the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/list', listRouter);

// Listen to server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});
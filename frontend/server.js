
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const routes = require('./server/routes/allRoutes')
//const connectDB = require('./server/database/db_connection')


dotenv.config( { path:'config.env'} )
const PORT = process.env.PORT || 3000


// body-parser depracated therefore  express
app.use(express.urlencoded({ extended : true }))

// set view engine & EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ALL static files
app.use(express.static('public'))

// Routes
app.use(routes)


app.listen(PORT,() => {
    console.log(`Frontend is running http://localhost:${PORT}`);
})
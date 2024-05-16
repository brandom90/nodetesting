require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

//imports all routes in workout.js
const workoutRoutes = require('./routes/workouts')

// express app, express is stored here
const app = express()

//middleware, for every req that comes in this runs.
// if app sees if data has a body, it gets it (express.json()) and passes it to the req object
app.use(express.json())

app.use((req,res,next) => {
    console.log(req,path, req.method)
    next()
})

//routes, used as shortcut
// when user goes /api/workout forward slash, workoutRoutes start
app.use('/api/workouts', workoutRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })






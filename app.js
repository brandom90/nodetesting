const express = require('express')

const app = express()

// register view engine
app.set('view engine', 'ejs')
// now we have set the view engine to ejs
    //app.set('views', 'myviews')
// if i wanted my views folder to be named smth else

// listen for request

app.listen(3000)

app.get('/', (req,res) => {
    //res.send('<p> home page </p>')
    //res.sendFile('./views/about.html', {root: __dirname})
    res.render('index')
})


app.get('/about', (req,res) => {
    //res.send('<p> about page </p>')
    res.render('about')
})

    // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

app.get('/blogs/create', (req, res) => {
    res.render('create')
})
//404
// use this function for ANY requests if the other .get above doesnt match the url
// HAS to be in the bottom
app.use((req, res)=> {
    res.status(404).render('404')
    // edit status code to be 404 cuz its not considered an error
})
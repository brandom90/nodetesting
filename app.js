const express = require('express')

const app = express()

// listen for request
app.listen(3000)

// register view engine
app.set('view engine', 'ejs')
// now we have set the view engine to ejs
    //app.set('views', 'myviews')
// if i wanted my views folder to be named smth else



app.get('/', (req,res) => {
    //res.send('<p> home page </p>')
    //res.sendFile('./views/about.html', {root: __dirname})
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title:'Home', blogs})
})


app.get('/about', (req,res) => {
    //res.send('<p> about page </p>')
    res.render('about', {title:'About'})
})

    // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

app.get('/blogs/create', (req, res) => {
    res.render('create', {title:'Create a New Blog'})
})
//404
// use this function for ANY requests if the other .get above doesnt match the url
// HAS to be in the bottom
app.use((req, res)=> {
    res.status(404).render('404', {title:'404'})
    // edit status code to be 404 cuz its not considered an error
})
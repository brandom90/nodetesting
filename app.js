const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const app = express()

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:hcog-horse-nettheworld101@accountinfo.nmlfwry.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=AccountInfo'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))



// register view engine
app.set('view engine', 'ejs')
// now we have set the view engine to ejs
    //app.set('views', 'myviews')
// if i wanted my views folder to be named smth else

// app.use((req,res, next) => {
//     // all properties of the req.
//     console.log('new request made: ');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
//     //we finish with this middleware, move on.
// })

// middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'))

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

// routes
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

// .use is mdddle ware
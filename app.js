const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const blogPosts = [];

app.get('/', (req, res) => {
    res.render('index', { blogPosts: blogPosts });
});

app.get('/blog/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id === postId);
    res.render('post', { post: post });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const postId = generatePostId();
    const newPost = { id: postId, title: title, content: content };
    blogPosts.push(newPost);
    res.redirect('/');
});

function generatePostId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

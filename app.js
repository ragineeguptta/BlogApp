const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the templating engine
app.set("view engine", "ejs");

// In-memory storage for posts
let posts = [];

// Routes
app.get("/", (req, res) => {
    res.render("home", { posts: posts });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postTitle", (req, res) => {
    const requestedTitle = req.params.postTitle.toLowerCase();
    const post = posts.find(p => p.title.toLowerCase() === requestedTitle);

    if (post) {
        res.render("post", { title: post.title, content: post.content });
    } else {
        res.status(404).send("Post not found");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

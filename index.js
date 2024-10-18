import express from "express";
import bodyParser from "body-parser";
import Post from "./public/getPost.js"

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));




app.get("/", (req, res) => {
    res.render("index.ejs", {content: posts})
})


app.get("/post", (req, res) => {
    res.render("post.ejs")
})

app.post("/submit", (req, res) => {

    const title = req.body["title"];
    const author = req.body["author"];
    const content = req.body["content-form"];

    const post = new Post(title, author, content);
    posts.push(post);
  

    res.redirect("/");
})

app.get("/edit", (req, res) =>{

    const titleEdit = req.query["edit"];
    const toEdit = posts.filter(post => (post.title === titleEdit))
    res.render("edit.ejs", {data: toEdit[0]})
})

app.post("/edit-submit", (req, res) => {

    const dataToEdit = req.body["to-edit"];
    const dataObjectToEdit = posts.filter(post => (post.title === dataToEdit));

    const newTitle = req.body["title"];
    const newAuthor = req.body["author"];
    const newContent = req.body["content-form"];

    dataObjectToEdit[0].editPost(newTitle, newAuthor, newContent)

    res.redirect("/");
})


app.get("/delete", (req, res) =>{
    const titleToFilter = req.query["delete"];
    posts = posts.filter(post => (post.title != titleToFilter));
    
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
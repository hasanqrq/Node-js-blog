import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
  let posts = [];

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
res.render("index.ejs");
});

app.post("/create", (req, res) => {

  const newPosts = {
    content: req.body.content
  }
  
  posts.push(newPosts);

  res.render("index.ejs", {
    posts: posts
     
  },
    console.log("newposts:" + newPosts)
)
  });

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
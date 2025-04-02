import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
let posts = [];


const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
res.render("index.ejs", {
    posts: posts
     
  },
 
  )
});

app.post("/create", (req, res) => {

  const newPosts = {
    content: req.body.content
  }
  
  posts.push(newPosts);

  res.render("/", {
    posts: posts
     
  }
 
  )
});

app.post("/delete/:index", (req, res) => {
  const postIndex = req.params.index;
  if (postIndex >= 0 && postIndex < posts.length) {
   posts.splice(postIndex, 1);
  } else {
    console.log(`❌ Invalid delete attempt at index: ${postIndex}`);
}

 
  res.render("index.ejs", {
    posts: posts
     
  },
 
  )
})

app.post("/edit/:index", (req, res) => { 

    const postIndex = parseInt(req.params.index);
    let newContent = req.body.content;

  if (postIndex >= 0 && postIndex < posts.length) {
    posts[postIndex].content = newContent;
  } else {
      console.log(`❌ Invalid update attempt at index: ${postIndex}`);
  }

 res.render("index.ejs", {
    posts: posts
     
  }
  )
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
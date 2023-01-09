const { json } = require("express");
const express = require("express");
const { ObjectId } = require("mongodb");
const { connectPosts, postsDb } = require("./connectDb");
const Events = require("events");
const { log } = require("console");

const emitter = new Events();
let app = express();

// to make a template engine
app.set("view engine", "ejs");

// to change into json format
app.use(express.json());

// to read img or files
app.use(express.static("./src"));

// server port
let PORT = process.env.PORT || 3000;

// users

let getPosts;

// connecting into server
connectPosts((err) => {
  log(err);
  if (!err) {
    app.listen(PORT, () => {
      console.log("listening...");
    });
    getPosts = postsDb();
  }
});

const posts = () => {
  let m = [];
  //   posts are emmitting
  getPosts
    .collection("posts")
    .find()
    .forEach((el) => {
      m.push(el);
    })
    .then((db) => {
      console.log(m);
      return m;
    })
    .catch(() => {
      console.log("error");
    });
};

// home page rendering
app.get("/", (req, res) => {
  res.render("index", {
    posts: [
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
      {
        title: "Sankt-Peterburgda bir kechada ikki ming migrant qo‘lga olindi.",
      },
    ],
  });
});

app.post("/post", (req, res) => {
  let body = req.body;
  getPosts
    .collection("posts")
    .insertOne(body)
    .then((db) => {
      res.status(201).json({ status: "true" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// about page rendering
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/pages/aboutPage.html");
});

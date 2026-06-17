import express from "express";

var blogs = [];
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentPage: "home",
    blogs,
  });
});

app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs", {
    editMode: false,
    blog: null,
    id: null,
    currentPage: "addBlog",
  });
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs[id];

  if (!blog) {
    return res.redirect("/");
  }

  res.render("addBlog.ejs", {
    blog: blog,
    id: id,
    editMode: true,
    currentPage: "addBlog",
  });
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs[id];

  if (!blog) {
    return res.redirect("/");
  }

  res.render("viewBlog.ejs", {
    blog: blog,
    currentPage: "viewBlog",
  });
});

// POST (Add new blog)
app.post("/submitBlog", (req, res) => {
  var blog = {
    author: req.body["author"],
    title: req.body["title"],
    details: req.body["details"],
  };
  blogs.push(blog);

  console.log(blog);
  res.redirect("/");
});

// POST (Edit blog)
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);

  blogs[id].author = req.body["author"];
  blogs[id].title = req.body["title"];
  blogs[id].details = req.body["details"];

  res.redirect("/");
});

// GET (Remove blog)
app.get("/remove/:id", (req, res) => {
  const id = req.params.id;

  blogs.splice(id, 1);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

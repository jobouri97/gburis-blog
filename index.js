import express from "express";

var blogs = [];
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// GET (linked in)
app.get("/goToLinkedIn", (req, res) => {
  res.redirect("https://www.linkedin.com/in/ali-al-jobouri-09bbb53bb");
});

app.get("/", (req, res) => {
  //res.render("index.ejs", { blogs });
  res.render("addBlog.ejs", {
    editMode: false,
    blog: null,
    id: null,
  });
});

// GET
app.get("/addBlog", (req, res) => {
  res.render("addBlog.ejs", {
    editMode: false,
    blog: null,
    id: null,
  });
});

// GET (Edit blog)
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  res.render("addBlog", {
    blog: blogs[id],
    editMode: true,
    id: id,
  });
});

// GET (View blog)
app.get("/view/:id", (req, res) => {
  const id = req.params.id;

  res.render("viewBlog.ejs", {
    blog: blogs[id],
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

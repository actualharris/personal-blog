import express from "express";
import axios from "axios";



const port = 3000;
const app = express();
const API_URL = "http://localhost:4000";

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Route to render the main page
app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      console.log(response);
      res.render("home.ejs", { posts: response.data });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  });

// -------------------------------------------------------
// Create a new post

app.get("/create", (req, res)=>{
    res.render("create.ejs")
});

app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// -------------------------------------------------------

// Route to render the edit page

app.get("/api/posts/update/:id", async (req, res)=>{

  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("update.ejs", {
      post : response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Update a post

app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});



// -------------------------------------------------------
// Delete a post

app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${API_URL}/posts/${req.params.id}`);
        res.redirect("/");
      } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
      }

      console.log(`${API_URL}/posts`)
    
});




app.listen(port, ()=>{
    console.log(`server running at ${port}`);
})
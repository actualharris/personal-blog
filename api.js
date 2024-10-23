import express from "express"
// import { title } from "process";
import cors from 'cors';



const app = express();
const port = 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// In-memory data store
const posts = [ {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    
  },
];


let lastId = 3;

// GET all posts

app.get("/posts", (req,res)=>{
    res.json(posts);
})

// GET a specific post by id

app.get("/posts/:id", (req, res)=>{
   const post = posts.find(p => p.id===parseInt(req.params.id));
   if(!post) return res.status(404).json({ message: "Post not found" });
   res.json(post)
})

// POST a new post
app.post("/posts", (req, res)=>{

    const newId = lastId += 1;
    const post = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
    }
    // lastId = newId;
    posts.push(post);
    res.status(201).json(post);

})

// PATCH a post when you just want to update one parameter

app.patch("/posts/:id", (req, res)=>{

    const existingPost = posts.find(p => p.id===parseInt(req.params.id));
    if(!existingPost) return res.status(404).json({ message: "Post not found" });

    const replacementPost = {
        id: existingPost.id,
        title: req.body.title || existingPost.title,
        content: req.body.content || existingPost.content,
    }

    const postIndex = posts.findIndex(p => p.id===parseInt(req.params.id));
    posts[postIndex]=replacementPost;
    res.json(replacementPost);

})


// DELETE a specific post by providing the post id

app.delete("/posts/:id", (req, res)=>{
    const index = posts.findIndex(p => p.id===parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    posts.splice(index, 1);
  res.json({ message: "Post deleted" });

});


app.listen(port, () =>{
    console.log(`listening api at ${port}`);
})
import express from "express";
import fs from "fs";
import Blog from '../models/BlogSchema.js';
import { upload } from "../middlewares/multer.middleware.js";
import { upLoadOnCloudinary } from "../utils/cloudinary.js";
import blogsValidation from '../middlewares/blogsValidation.js';


const router = express.Router();



// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
    } catch (error) {
        res.status(500).send('Server error');
    }
});






// Get a single blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send("Data not found");
        res.send(blog);
    } catch (error) {
        res.status(500).send('Server error');
    }
});





// Create a new blog
router.post("/", upload.single("thumbnail"), blogsValidation, async (req, res) => {
    const { uid, title, category, content } = req.body;
    let thumbnailUrl = null;

    if (req.file) {
        const localFilePath = req.file.path;
        const response = await upLoadOnCloudinary(localFilePath);
        if (response) {
            thumbnailUrl = response.url;
            fs.unlinkSync(localFilePath);
        } else {
            console.log("Error in thumbnail");
            return res.status(500).send("Failed to upload image");
        }
    }

    const blog = new Blog({
        uid,
        title,
        category,
        content,
        thumbnail: thumbnailUrl
    });


    try {
        const savedBlog = await blog.save();
        res.send(savedBlog);
    } catch (error) {
        res.status(500).send('Server error');
    }
});






// Update an existing blog
router.put("/:id", upload.single("thumbnail"), blogsValidation, async (req, res) => {
    let thumbnailUrl = null;

    if (req.file) {
        const localFilePath = req.file.path;
        const response = await upLoadOnCloudinary(localFilePath);
        if (response) {
            thumbnailUrl = response.url;
            fs.unlinkSync(localFilePath);
        } else {
            console.log("Error in thumbnail");
            return res.status(500).send("Failed to upload image");
        }
    }

    try {
        const updateBlog = {
            title: req.body.title,
            category: req.body.category,
            content: req.body.content
        };
        if (thumbnailUrl) {
            updateBlog.thumbnail = thumbnailUrl;
        }
        const blog = await Blog.findByIdAndUpdate(req.params.id, updateBlog, { new: true });
        if (!blog) return res.status(404).send('Blog not found');
        res.send(blog);
    } catch (error) {
        res.status(500).send('Server error');
    }
});




// Post comments to a blog
router.post('/:id/comments', async (req, res) => {
    const { author, text } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send("Blog not found");

        blog.comment.push({ author, text });
        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(500).send("Server error");
    }
});





// Get comments for a blog
router.get('/:id/comments', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send("Data not found");
        res.send(blog);
    } catch (error) {
        res.status(500).send('Server error');
    }
});




// Delete a blog
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).send('Blog not found');
        res.send(blog);
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send('Server error');
    }
});



export default router;

import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


const blogSchema = new mongoose.Schema({
  uid: { type: String, required: true},
  title: { type: String, required: true, minlength: 3, maxlength: 100,},
  category: { type: String, required: true, minlength: 3, maxlength: 30,},
  content: { type: String, required: true, minlength: 10, maxlength: 10000,},
  thumbnail: { type: String },
  date: { type: Date, default: Date.now },
  comment : [commentSchema]
});


const Blog = mongoose.model("Blog", blogSchema);


export default Blog
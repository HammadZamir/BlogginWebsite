import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import './src/models/dbConnection.js';
import userAuthRouter from './src/routes/userAuthRouter.js';
import blogsRouter from './src/routes/blogsRouter.js';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.use(cors({ origin: "http://localhost:5173" })); // to connect frontend to backend


app.use('/auth' , userAuthRouter);        // Route for Authenticatio
app.use('/blogs', blogsRouter);            // Route for Blogs   


app.get("/", async (req, res) => {
  res.send("Hello");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

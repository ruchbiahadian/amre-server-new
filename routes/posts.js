import express from "express";
import { addPosts, getPosts, deletePost, updatePost } from "../controllers/post.js";

const router = express.Router()


router.get("/", getPosts)
router.post("/", addPosts)
router.delete("/:id", deletePost)
router.put("/update", updatePost)


export default router
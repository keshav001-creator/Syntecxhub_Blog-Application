import express from "express";

import {

createPost,

getPosts,

getPost,

updatePost,

deletePost

} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post(

"/",

authMiddleware,

upload.single("image"),

createPost

);

router.put(

"/:id",

authMiddleware,

upload.single("image"),

updatePost

);

router.delete(

"/:id",

authMiddleware,

deletePost

);

export default router;
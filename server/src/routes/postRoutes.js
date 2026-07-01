import express from "express";

const {

createPost,

getPosts,

getPost,

updatePost,

deletePost

} = require("../controller/postController.js");

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

module.exports = router;
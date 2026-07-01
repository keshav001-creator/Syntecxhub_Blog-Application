const Post = require("../models/post.js");

const createPost = async (req, res) => {

    try {

        const { title, content } = req.body;

        const image = req.file ? req.file.path : "";

        const post = await Post.create({

            title,

            content,

            image,

            author: req.user._id

        });

        res.status(201).json(post);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()

            .populate("author", "username email")

            .sort({ createdAt: -1 });

        res.json(posts);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};


const getPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)

            .populate("author", "username");

        if (!post) {

            return res.status(404).json({

                message: "Post not found"

            });

        }

        res.json(post);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

const updatePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({

                message: "Post not found"

            });

        }

        if (post.author.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                message: "Unauthorized"

            });

        }

        post.title = req.body.title || post.title;

        post.content = req.body.content || post.content;

        if (req.file) {

            post.image = req.file.path;

        }

        await post.save();

        res.json(post);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};


const deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({

                message: "Post not found"

            });

        }

        if (post.author.toString() !== req.user._id.toString()) {

            return res.status(403).json({

                message: "Unauthorized"

            });

        }

        await post.deleteOne();

        res.json({

            message: "Post Deleted"

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
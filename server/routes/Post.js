const express = require("express");
const { getAllPosts, getPostsByUserId, getPostById, createPost, updatePost, deletePost, sharePost } = require("../controllers/Post");
const { auth } = require("../middlewares/Auth");
const router = express.Router();

router.get('/posts', getAllPosts);
router.get("/posts/users/:userId", getPostsByUserId);
router.get('/posts/:postId', getPostById);
router.post('/posts', auth, createPost);
router.put('/posts/:postId', auth, updatePost);
router.delete('/posts/:postId', auth, deletePost);
router.post("/posts/:postId/share", auth, sharePost);

module.exports = router;


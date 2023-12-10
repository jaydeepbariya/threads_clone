const express = require("express");
const { getAllPosts, getPostsByUserId, getPostById, createPost, updatePost, deletePost, sharePost } = require("../controllers/Post");
const { auth } = require("../middlewares/Auth");
const { likePost, unlikePost } = require("../controllers/Like");
const router = express.Router();

router.get('/', getAllPosts);
router.get("/users/:userId", getPostsByUserId);
router.get('/:postId', getPostById);
router.post('/', auth, createPost);
router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);
router.post("/:postId/share", auth, sharePost);

router.post('/:postId/like', auth, likePost);
router.delete('/:postId/unlike', auth, unlikePost);

module.exports = router;


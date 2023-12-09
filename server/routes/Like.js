const express = require('express');
const { auth } = require('../middlewares/Auth');
const { likePost, unlikePost } = require('../controllers/Like');
const router = express.Router();

router.post('/posts/:postId/like', auth, likePost);
router.delete('/posts/:postId/unlike', auth, unlikePost);

module.exports = router;
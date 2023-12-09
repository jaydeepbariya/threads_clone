const express = require('express');
const { auth } = require('../middlewares/Auth');
const { followUser, unfollowUser } = require('../controllers/Follow');
const router = express.Router();

router.post('/users/:userId/follow', auth, followUser);
router.post('/users/:userId/unfollow', auth, unfollowUser);

module.exports = router;

const express = require('express');
const { auth } = require('../middlewares/Auth');
const { followUser, unfollowUser } = require('../controllers/Follow');
const router = express.Router();

router.post('/:userId/follow', auth, followUser);
router.post('/:userId/unfollow', auth, unfollowUser);

module.exports = router;

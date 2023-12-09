const express = require('express');
const { auth } = require('../middlewares/Auth');
const { deleteUser, getUser } = require('../controllers/User');
const router = express.Router();

router.delete('/users/:userId', auth, deleteUser);
router.get('/users/:userId', auth, getUser);

module.exports = router;
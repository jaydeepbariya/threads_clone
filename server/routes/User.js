const express = require('express');
const { auth } = require('../middlewares/Auth');
const { deleteUser, getUser } = require('../controllers/User');
const router = express.Router();

router.delete('/', auth, deleteUser);
router.get('/:userId', getUser);

module.exports = router;
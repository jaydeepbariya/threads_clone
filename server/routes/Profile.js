const express = require('express');
const { addProfile, editProfile } = require('../controllers/Profile');
const { auth } = require('../middlewares/Auth');
const router = express.Router();

router.post('/',auth, addProfile);
router.put('/',auth, editProfile);


module.exports = router;

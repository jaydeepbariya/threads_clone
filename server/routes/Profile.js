const express = require('express');
const { addProfile, editProfile, deleteProfile, getProfile } = require('../controllers/Profile');
const { auth } = require('../middlewares/Auth');
const router = express.Router();

router.post('/profiles',auth, addProfile);
router.put('/profiles/:userId',auth, editProfile);
router.delete('/profiles/:userId',auth, deleteProfile);
router.get('/profiles/:userId', getProfile);


module.exports = router;

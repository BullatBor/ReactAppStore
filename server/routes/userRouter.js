const Router = require('express');
const userController = require('../controllers/userController');
const router = new Router();

router.post('/registration',)//пути
router.post('/login');
router.get('/auth', userController.check);

module.exports = router;
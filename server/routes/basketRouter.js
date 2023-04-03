const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.create);
router.post('/remove', basketController.removeDevice);
router.get('/', basketController.getBasketId);
module.exports = router;
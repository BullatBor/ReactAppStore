const {BasketDevice} = require('../models/models')


class BasketController {
    //, basketId, deviceId
    async  create(req, res) {
        let {basketId, deviceId} = req.body
        const devices = await BasketDevice.create({basketId, deviceId})
        return res.json(devices)
    }
    async  getBasketId(req, res) {
        const {basketId} = req.query
        const devices = await BasketDevice.findAll({ where:{ basketId: basketId}});
        return res.json(devices);
    }

    async  removeDevice(req, res) { 
        const {basketId, deviceId} = req.body
        const deviceToDelete = await BasketDevice.findOne({
            where: { basketId: basketId, deviceId: deviceId },
            order: [['createdAt', 'DESC']] // Сортировка по дате создания в порядке убывания
          });
          await BasketDevice.destroy({ where: { id: deviceToDelete.id } }); 
        const devices = await BasketDevice.findAll({ where:{ basketId: basketId}});
        return res.json(devices);
    }
}
 
module.exports = new BasketController()
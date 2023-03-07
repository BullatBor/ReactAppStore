
const uuid = require('uuid');//Для рандомных айди
const path = require('path');//есть в Node.js
const {Device} = require('../models/models');
const ApiError = require('../error/ApiError')

class DeviceController {
    async  create(req, res, next) {
        try{
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', filename));//Переносим все фото с сервера в папку static
            
            const device =  await Device.create({name, price, brandId, typeId, img: filename})
        } catch(e){
            next(ApiError.badRequest(e.message));

        }
       
    }
    async  getAll(req, res) {
        
    }
    async  getOne(req, res) {
        
    }
}

module.exports = new DeviceController()
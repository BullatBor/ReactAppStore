import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._type = [
            {id: 1, name: 'Холодильник'},
            {id: 2, name: 'Смартфоны'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'}
        ]
        this._devices = [
            {id: 1, name: 'Iphone 12 pro', price: 25000, rating: 5, img: 'https://www.ixbt.com/img/n1/news/2021/3/6/iPhone-12-Zach-Griff-8_large_large_large.jpeg'},
            {id: 2, name: 'Iphone 12 pro', price: 25000, rating: 5, img: 'https://www.ixbt.com/img/n1/news/2021/3/6/iPhone-12-Zach-Griff-8_large_large_large.jpeg'},
            {id: 3, name: 'Iphone 12 pro', price: 25000, rating: 5, img: 'https://www.ixbt.com/img/n1/news/2021/3/6/iPhone-12-Zach-Griff-8_large_large_large.jpeg'},
            {id: 4, name: 'Iphone 12 pro', price: 25000, rating: 5, img: 'https://www.ixbt.com/img/n1/news/2021/3/6/iPhone-12-Zach-Griff-8_large_large_large.jpeg'}

        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types =types;
    }
    setBrands(brands) {
        this._brands = brands;
    }
    setDevices(devices) {
        this._devices = devices;
    }

    get types() {
        return this._types;
    }
    get brands(){
        return this._brands;
    } 
    get devices(){
        return this._devices;
    } 
    
}
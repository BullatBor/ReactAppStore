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
            {id: 1, name: 'Iphone 12 pro', price: 25000, rating: 5, img: ''},
            {id: 2, name: 'Apple'}
        ]
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user(){
        return this._user;
    } 
    
}
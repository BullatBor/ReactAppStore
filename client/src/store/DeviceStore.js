import {makeAutoObservable} from 'mobx';

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._basketDevices = []
        this._selectedType = {}//хранение выделенного типа
        this._selectedBrand = {} //хранение выделенного брэнда
        this._selectedBasketDevice = {} //хранение девайсов в корзине
        this._priceDevices = 0
        this._page = 1
        this._totalCount = 8
        this._limit = 3
        makeAutoObservable(this)
    }
    setPlusPrice(price){
        this._TotalPrice = this._TotalPrice + price;
    }
    setAllPrice(price){
        this._TotalPrice = price;
    }
    setMinusPrice(price){
        this._TotalPrice = this._TotalPrice - price;
    }

    setPlusCount(count){
        this._TotalBasketCount = this._TotalBasketCount + count;
    }
    setAllCount(count){
        this._TotalBasketCount = count;
    }
    
    setMinusCount(count){
        this._TotalBasketCount = this._TotalBasketCount - count;
    }

    setBasketDevices(device) {
        this._basketDevices = device
    }
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    get AllPrice(){
        return this._TotalPrice
    }
    get CountDevices(){
        return this._TotalBasketCount
    }
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get price() {
        return this._priceDevices
    }
    get basket() {
        return this._basketDevices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
    

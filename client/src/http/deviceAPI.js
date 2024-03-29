//функция выбора типов и юрендов
import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode"; //для декодирование токена

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)//authHost потому что нужна авторизация для создания
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)//authHost потому что нужна авторизация для создания
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)//authHost потому что нужна авторизация для создания
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit=5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/` + id)
    return data
}

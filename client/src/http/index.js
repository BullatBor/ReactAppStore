import axios from "axios"

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})//для обычных запросов которые не требуют авторизации

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})//для обычных запросов которые не требуют авторизации

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}//в случаи второго инстанса

$authHost.interceptors.request.use(authInterceptor)//подставлять токен в header перед запросом

export {
    $host,
    $authHost
}
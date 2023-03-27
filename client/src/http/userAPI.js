//функция авторизации, регистрации и проверка токена на валидность
import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode"; //для декодирование токена

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: "ADMIN"})
     localStorage.setItem('token', data.token)   //сохраняем токен
    return jwt_decode(data.token)//результат декодирования токена
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)//результат декодирования токена
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth',)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)//результат декодирования токена
}
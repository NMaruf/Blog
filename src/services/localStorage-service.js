import { message } from 'antd'

export default class ServiceLocalStorage {
  getToken(key) {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      return message.error('Ошибка чтения из LocalStorage !')
    }
  }

  setToken(key, value) {
    try {
      return localStorage.setItem(key, value)
    } catch (error) {
      return message.error('Ошибка записи в LocalStorage !')
    }
  }

  removeToken(key) {
    try {
      return localStorage.removeItem(key)
    } catch (error) {
      return message.error('Ошибка очистки LocalStorage !')
    }
  }
}

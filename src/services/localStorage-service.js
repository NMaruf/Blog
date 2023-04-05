export default class ServiceLocalStorage {
  getToken = (key) => localStorage.getItem(key)

  setToken = (key, value) => localStorage.setItem(key, value)

  removeToken = (key) => localStorage.removeItem(key)
}

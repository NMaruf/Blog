import ServiceLocalStorage from './localStorage-service'

export default class BlogService {
  localStorageService = new ServiceLocalStorage()

  _apiBase = 'https://blog.kata.academy/api'

  async getArticles(page) {
    const token = this.localStorageService.getToken('tokenKey')
    const offset = (page - 1) * 5
    const res = await fetch(`${this._apiBase}/articles?offset=${offset}&limit=5`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles?offset=${offset}&limit=5, receiced ${res.status}`)
    }
    const data = await res.json()
    return data.articles
  }

  async getArticleDetails(slug) {
    const token = this.localStorageService.getToken('tokenKey')
    const res = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles/${slug}, receiced ${res.status}`)
    }
    const data = await res.json()
    return data.article
  }

  async registerUser(email, username, password) {
    const obj = {
      user: {
        email,
        username,
        password,
      },
    }

    const res = await fetch(`${this._apiBase}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/users, receiced ${res.status}`)
    }
    return await res.json()
  }

  async loginUser(email, password) {
    const obj = {
      user: {
        email,
        password,
      },
    }

    const res = await fetch(`${this._apiBase}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/users/login, receiced ${res.status}`)
    }
    return await res.json()
  }

  async getCurrentUser() {
    const token = this.localStorageService.getToken('tokenKey')
    const res = await fetch(`${this._apiBase}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/user, receiced ${res.status}`)
    }
    return await res.json()
  }

  async updateCurrentUser(objUser) {
    const token = this.localStorageService.getToken('tokenKey')
    const obj = { user: objUser }
    const res = await fetch(`${this._apiBase}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify(obj),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/user, receiced ${res.status}`)
    }
    return await res.json()
  }

  async createArticle(obj) {
    const token = this.localStorageService.getToken('tokenKey')
    const objArticle = { article: obj }

    const res = await fetch(`${this._apiBase}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify(objArticle),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/users/login, receiced ${res.status}`)
    }
    return await res.json()
  }

  async editArticle(obj, slug) {
    const token = this.localStorageService.getToken('tokenKey')
    const objArticle = { article: obj }

    const res = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify(objArticle),
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles/${slug}, receiced ${res.status}`)
    }
    return await res.json()
  }

  async deleteArticle(slug) {
    const token = this.localStorageService.getToken('tokenKey')

    const res = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles/${slug}, receiced ${res.status}`)
    }
    return res
  }

  async favoriteArticle(slug) {
    const token = this.localStorageService.getToken('tokenKey')

    const res = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles/${slug}/favorite, receiced ${res.status}`)
    }
    return res
  }

  async unFavoriteArticle(slug) {
    const token = this.localStorageService.getToken('tokenKey')

    const res = await fetch(`${this._apiBase}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles/${slug}/favorite, receiced ${res.status}`)
    }
    return res
  }
}

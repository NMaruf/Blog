export default class BlogService {
  _apiBase = 'https://blog.kata.academy/api'

  async getArticles(page) {
    const offset = (page - 1) * 5
    const res = await fetch(`${this._apiBase}/articles?offset=${offset}&limit=5`)

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/articles?offset=${offset}&limit=5, receiced ${res.status}`)
    }
    const data = await res.json()
    return data.articles
  }

  async getArticleDetails(slug) {
    const res = await fetch(`${this._apiBase}/articles/${slug}`)

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
    const token = localStorage.getItem('tokenKey')
    console.log('TOKEN: ', token)
    const res = await fetch(`${this._apiBase}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}/user, receiced ${res.status}`)
    }
    return await res.json()
  }

  async updateCurrentUser(email, password, username, image) {
    const token = localStorage.getItem('tokenKey')
    const obj = {
      user: {
        email,
        password,
        username,
        image,
      },
    }
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
}

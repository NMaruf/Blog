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
}

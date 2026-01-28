/**
 * 外部 API 服务
 * 调用各种开源和免费的API接口
 */

import axios from 'axios'
import { EXTERNAL_APIS } from './config'

// 创建外部API实例 (不使用内部拦截器)
const createExternalAPI = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// JSONPlaceholder API - 测试数据
const jsonPlaceholderAPI = createExternalAPI(EXTERNAL_APIS.JSONPLACEHOLDER)

// GitHub API
const githubAPI = createExternalAPI(EXTERNAL_APIS.GITHUB)

// 随机用户API
const randomUserAPI = createExternalAPI(EXTERNAL_APIS.RANDOM_USER)

// 猫咪事实API
const catFactsAPI = createExternalAPI(EXTERNAL_APIS.CAT_FACTS)

// 狗狗图片API
const dogImagesAPI = createExternalAPI(EXTERNAL_APIS.DOG_IMAGES)

/**
 * JSONPlaceholder API 服务
 */
export const jsonPlaceholderService = {
  // 获取文章列表
  getPosts: (params = {}) => {
    return jsonPlaceholderAPI.get('/posts', { params })
  },

  // 获取文章详情
  getPostById: (id) => {
    return jsonPlaceholderAPI.get(`/posts/${id}`)
  },

  // 获取文章评论
  getPostComments: (postId) => {
    return jsonPlaceholderAPI.get(`/posts/${postId}/comments`)
  },

  // 获取用户列表
  getUsers: () => {
    return jsonPlaceholderAPI.get('/users')
  },

  // 获取用户详情
  getUserById: (id) => {
    return jsonPlaceholderAPI.get(`/users/${id}`)
  },

  // 获取用户相册
  getUserAlbums: (userId) => {
    return jsonPlaceholderAPI.get('/albums', {
      params: { userId },
    })
  },

  // 获取相册照片
  getAlbumPhotos: (albumId) => {
    return jsonPlaceholderAPI.get('/photos', {
      params: { albumId },
    })
  },

  // 获取待办事项
  getTodos: (params = {}) => {
    return jsonPlaceholderAPI.get('/todos', { params })
  },
}

/**
 * GitHub API 服务
 */
export const githubService = {
  // 搜索仓库
  searchRepositories: (query, params = {}) => {
    return githubAPI.get('/search/repositories', {
      params: {
        q: query,
        sort: 'stars',
        order: 'desc',
        per_page: 10,
        ...params,
      },
    })
  },

  // 获取用户信息
  getUser: (username) => {
    return githubAPI.get(`/users/${username}`)
  },

  // 获取用户仓库
  getUserRepos: (username, params = {}) => {
    return githubAPI.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 10,
        ...params,
      },
    })
  },

  // 获取仓库信息
  getRepository: (owner, repo) => {
    return githubAPI.get(`/repos/${owner}/${repo}`)
  },

  // 获取仓库贡献者
  getRepoContributors: (owner, repo) => {
    return githubAPI.get(`/repos/${owner}/${repo}/contributors`)
  },
}

/**
 * 随机用户API服务
 */
export const randomUserService = {
  // 获取随机用户
  getRandomUsers: (count = 10, params = {}) => {
    return randomUserAPI.get('/', {
      params: {
        results: count,
        ...params,
      },
    })
  },

  // 获取指定国籍的随机用户
  getRandomUsersByNationality: (nationality, count = 5) => {
    return randomUserAPI.get('/', {
      params: {
        results: count,
        nat: nationality,
      },
    })
  },
}

/**
 * 猫咪事实API服务
 */
export const catFactsService = {
  // 获取随机猫咪事实
  getRandomFact: () => {
    return catFactsAPI.get('/fact')
  },

  // 获取多个猫咪事实
  getFacts: (limit = 5) => {
    return catFactsAPI.get('/facts', {
      params: { limit },
    })
  },
}

/**
 * 狗狗图片API服务
 */
export const dogImagesService = {
  // 获取随机狗狗图片
  getRandomImage: () => {
    return dogImagesAPI.get('/api/breeds/image/random')
  },

  // 获取多张随机狗狗图片
  getRandomImages: (count = 3) => {
    return dogImagesAPI.get(`/api/breeds/image/random/${count}`)
  },

  // 获取所有品种列表
  getAllBreeds: () => {
    return dogImagesAPI.get('/api/breeds/list/all')
  },

  // 获取指定品种的图片
  getBreedImages: (breed, count = 3) => {
    return dogImagesAPI.get(`/api/breed/${breed}/images/random/${count}`)
  },
}

/**
 * 诗词API服务 (中文)
 */
export const poetryService = {
  // 获取随机诗词
  getRandomPoetry: () => {
    return axios.get('https://v1.jinrishici.com/all.json')
  },
}

/**
 * 免费天气API服务 (需要API key，这里提供示例)
 */
export const weatherService = {
  // 获取当前天气 (需要API key)
  getCurrentWeather: (city, apiKey) => {
    const weatherAPI = createExternalAPI(EXTERNAL_APIS.WEATHER)
    return weatherAPI.get('/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'zh_cn',
      },
    })
  },
}

/**
 * 免费新闻API服务 (需要API key)
 */
export const newsService = {
  // 获取头条新闻 (需要API key)
  getTopHeadlines: (apiKey, params = {}) => {
    const newsAPI = createExternalAPI(EXTERNAL_APIS.NEWS)
    return newsAPI.get('/top-headlines', {
      params: {
        country: 'us',
        pageSize: 10,
        apiKey,
        ...params,
      },
    })
  },
}

// 导出所有服务
const externalServices = {
  jsonPlaceholderService,
  githubService,
  randomUserService,
  catFactsService,
  dogImagesService,
  poetryService,
  weatherService,
  newsService,
}

export default externalServices

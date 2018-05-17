import axios from 'axios'

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const defaultParam = {
  limit: 10,
  offset: 0
}

export const doRegister = (payload) => {
  return axios.post(
   `/users`,
    JSON.stringify(payload)
  )
}

export const doLogin = (payload) => {
  return axios.post(
   `/users/login`,
    JSON.stringify(payload)
  )
}

export const doUpdate = (payload) => {
  return axios.put(
    `/user`,
    JSON.stringify(payload),
    {
      headers: {
        'Authorization': `Token ${payload.user.token}`
      }
    }
  )
}

export const doGetTags = () => {
  return axios.get(
    `/tags`
  )
}

export const doGetArticles = (payload) => {
  const params = Object.assign(
    {},
    defaultParam,
    payload.params
  )

  const headers = (typeof payload.token === 'undefined' || payload.token === '')
  ? {}
  : {'Authorization': `Token ${payload.token}`}

  const options =  {
    method: 'get',
    url: `/articles`,
    headers: headers,
    params: params
  }

  return axios(options)

}

export const doToggleFavorite = (payload) => {
  const { slug, token, favorited } = payload

  const options =  {
    method: favorited ? 'delete' : 'post',
    url: `/articles/${slug}/favorite`,
    headers: {
      'Authorization': `Token ${token}`
    },
    data: ''
  }

  return axios(options)
}

export const doUpdateArticleApi = (payload) => {
  const {
    slug,
    title,
    description,
    body,
    tagList,
    token
  } = payload.articleData

  const options =  {
    method: (slug === '') ? 'post' : 'put',
    url: (slug === '') ? `/articles`:  `/articles/${slug}`,
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      title: title,
      description: description,
      body: body,
      tagList: tagList
    }
  }

  return axios(options)
}

export const doGetArticleApi = (payload) => {
  const {
    slug,
    token
  } = payload

  const headers = (typeof token === 'undefined' || token === '')
  ? {}
  : {'Authorization': `Token ${token}`}

  const options =  {
    method: 'GET',
    url: `/articles/${slug}`,
    headers: headers
  }

  return axios(options)
}

export const doGetComments = (payload) => {
  const {
    slug,
    token
  } = payload

  const headers = (typeof token === 'undefined' || token === '')
  ? {}
  : {'Authorization': `Token ${token}`}

  const options =  {
    method: 'GET',
    url: `/articles/${slug}/comments`,
    headers: headers
  }

  return axios(options)
}

export const doGetProfileAPI = (payload) => {
  const { username, token } = payload

  const headers = (typeof token === 'undefined' || token === '')
  ? {}
  : {'Authorization': `Token ${token}`}

  const options =  {
    method: 'get',
    url: `/profiles/${username}`,
    headers: headers
  }

  return axios(options)
}

export const doToggleFollowUserAPI = (payload) => {
  const { username, token, following } = payload

  const headers = (typeof token === 'undefined' || token === '')
  ? {}
  : {'Authorization': `Token ${token}`}

  const options =  {
    method: (following) ? 'POST' : 'DELETE',
    url: `/profiles/${username}/follow`,
    headers: headers
  }

  return axios(options)
}



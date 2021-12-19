
const initState = {
  articles: [],
  article: Object.create(null),
  query: Object.create(null),
  message: '',
  category: 0,
  tags: [],
  totalSize: 0,
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function articles(state= initState, action: any) {
  switch(action.type) {
    case 'LIST_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: action.payload.data,
        message: action.payload.message,
        totalSize: action.payload.data.length
      }
    case 'FIND_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.payload.data,
        message: action.payload.message,
        category: action.payload.category,
        tags: action.payload.tags
      }
    case 'SAVE_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.payload.data,
        message: action.payload.message
      }
    case 'NEW_ARTICLE':
      return {
        ...state,
        article: action.payload.data
      }
    default:
      return state
  }
}

/**
 * action
 */
export function listSuccess(payload: any) {
  return {
    type: 'LIST_ARTICLE_SUCCESS',
    payload: payload
  }
}

export function listFailure(payload: any) {
  return {
    type: 'LIST_ARTICLE_FAILURE',
    payload: payload
  }
}

export function findSuccess(payload: any) {
  return {
    type: 'FIND_ARTICLE_SUCCESS',
    payload: payload
  }
}

export function findFailure(payload: any) {
  return {
    type: 'FIND_ARTICLE_FAILURE',
    payload: payload
  }
}

export function saveSuccess(payload: any) {
  return {
    type: 'SAVE_ARTICLE_SUCCESS',
    payload: payload
  }
}

export function saveFailure(data: any) {
  return {
    type: 'SAVE_ARTICLE_FAILURE',
    payload: data
  }
}

export function newPublish(data: any) {
  return {
    type: 'NEW_ARTICLE',
    payload: data
  }
}

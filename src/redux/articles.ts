
const initState = {
  articles: [],
  article: Object.create(null),
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
    case 'LIST_SUCCESS':
      return {
        ...state,
        articles: action.payload.data,
        message: action.payload.message,
        totalSize: action.payload.data.length
      }
    case 'FIND_SUCCESS':
      return {
        ...state,
        article: action.payload.data,
        message: action.payload.message,
        category: action.payload.category,
        tags: action.payload.tags
      }
    case 'SAVE_SUCCESS':
      return {
        ...state,
        article: action.payload.data,
        message: action.payload.message
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
    type: 'LIST_SUCCESS',
    payload: payload
  }
}

export function listFailure(payload: any) {
  return {
    type: 'LIST_FAILURE',
    payload: payload
  }
}

export function findSuccess(payload: any) {
  return {
    type: 'FIND_SUCCESS',
    payload: payload
  }
}

export function findFailure(payload: any) {
  return {
    type: 'FIND_FAILURE',
    payload: payload
  }
}

export function saveSuccess(payload: any) {
  return {
    type: 'SAVE_SUCCESS',
    payload: payload
  }
}

export function saveFailure(data: any) {
  return {
    type: 'SAVE_FAILURE',
    payload: data
  }
}



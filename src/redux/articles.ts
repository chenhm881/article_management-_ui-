
const initState = {
  articles: [],
  message: '',
  tags: [],
  totalSize: 0
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
    default:
      return state
  }
}

/**
 * action
 */
export function listSuccess(data: any) {
  return {
    type: 'LIST_SUCCESS',
    payload: data
  }
}

export function listFailure(data: any) {
  return {
    type: 'LIST_FAILURE',
    payload: data
  }
}




const initState = {
  comments: [],
  comment: null,
  message: '',
  totalSize: 0,
  submitting: false,
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function comments(state= initState, action: any) {
  switch(action.type) {
    case 'LIST_COMMENT_SUCCESS':
      return {
        ...state,
        comments: action.payload.data,
        message: action.payload.message,
        totalSize: action.payload.data.length
      }
    case 'FIND_COMMENT_SUCCESS':
      return {
        ...state,
        comment: action.payload.data,
        message: action.payload.message,
      }
    case 'SAVE_COMMENT_SUCCESS':
      return {
        ...state,
        comment: action.payload.data,
        message: action.payload.message,
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
    type: 'LIST_COMMENT_SUCCESS',
    payload: payload
  }
}

export function listFailure(payload: any) {
  return {
    type: 'LIST_COMMENT_FAILURE',
    payload: payload
  }
}

export function saveSuccess(payload: any) {
  return {
    type: 'SAVE_COMMENT_SUCCESS',
    payload: payload
  }
}

export function saveFailure(data: any) {
  return {
    type: 'SAVE_COMMENT_FAILURE',
    payload: data
  }
}



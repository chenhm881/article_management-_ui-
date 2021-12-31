
const initState = {
  archives: [],
  query: Object.create(null),
  message: ''
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function archives(state= initState, action: any) {
  switch(action.type) {
    case 'LIST_ARCHIVE_SUCCESS':
      return {
        ...state,
        archives: action.payload.data,
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
export function listSuccess(payload: any) {
  return {
    type: 'LIST_ARCHIVE_SUCCESS',
    payload: payload
  }
}

export function listFailure(payload: any) {
  return {
    type: 'LIST_ARCHIVE_FAILURE',
    payload: payload
  }
}


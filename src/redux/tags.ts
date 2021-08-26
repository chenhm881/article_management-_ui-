
const initState = {
  tags: [],
  tag: Object.create(null),
  message: '',
  totalSize: 0,
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function tags(state= initState, action: any) {
  switch(action.type) {
    case 'LIST_TAG_SUCCESS':
      return {
        ...state,
        tags: action.payload.data,
        message: action.payload.message,
        totalSize: action.payload.data.length
      }
    case 'FIND_TAG_SUCCESS':
      return {
        ...state,
        tag: action.payload.data,
        message: action.payload.message,
      }
    case 'SAVE_SUCCESS':
      return {
        ...state,
        tag: action.payload.data,
        message: action.payload.message
      }
    default:
      return state
  }
}

/**
 * action
 */
export function listTagSuccess(payload: any) {
  return {
    type: 'LIST_TAG_SUCCESS',
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



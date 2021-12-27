
const initState = {
  likeState: null,
  message: '',
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function likeState(state= initState, action: any) {
  switch(action.type) {
    case 'FIND_LIKESTATE_SUCCESS':
      return {
        ...state,
        likeState: action.payload.data,
        message: action.payload.message,
      }
    case 'SAVE_LIKESTATE_SUCCESS':
      return {
        ...state,
        likeState: action.payload.data,
        message: action.payload.message,
      }
    default:
      return state
  }
}

/**
 * action
 */
export function findSuccess(payload: any) {
  return {
    type: 'FIND_LIKESTATE_SUCCESS',
    payload: payload
  }
}

export function findFailure(payload: any) {
  return {
    type: 'FIND_LIKESTATE_FAILURE',
    payload: payload
  }
}

export function saveSuccess(payload: any) {
  return {
    type: 'SAVE_LIKESTATE_SUCCESS',
    payload: payload
  }
}

export function saveFailure(data: any) {
  return {
    type: 'SAVE_LIKESTATE_FAILURE',
    payload: data
  }
}



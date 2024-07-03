/**
 * type
 */
import {Action} from "redux";


const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAILURE = 'REGISTER_FAILURE'

/**
 * state
 */
const initState = {
  user: '',
  message: '',
  refresh: 1,
  name: 'initName'
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function user(state=initState, action: any) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        name: action.name
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        message: action.payload.message
      }
    case LOGOUT:
      return {
        user: '',
        message: '',
        refresh: 0
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: action.payload.data,
        message: action.payload.message
      }
    default:
      return state
  }
}

/**
 * action type
 */

export function loginSuccess(data: any) {
  return {
    type: LOGIN_SUCCESS,
    name: data
  }
}

export function loginFailure(data: any) {
  return {
    type: LOGIN_FAILURE,
    payload: data
  }
}

export function logoutSuccess(data: any) {
  return {
    type: LOGOUT,
    name: data
  }
}

export function registerSuccess(data: any) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailure(data: any) {
  return {
    type: REGISTER_FAILURE,
    payload: data
  }
}

export function logout(data: any) {
  return {
    type: LOGOUT,
    name: data
  }
}

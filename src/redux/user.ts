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
  msg: '',
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
        user: '',
        msg: action.payload.msg
      }
    case LOGOUT:
      return {
        user: '',
        msg: '',
        refresh: 0
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: '',
        msg: action.payload
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

export function logout() {
  return {
    type: LOGOUT
  }
}

export interface SFA<ActionType> extends Action<ActionType> {};
export interface SFAPayload<ActionType, Payload> extends SFA<ActionType> {
  payload: Payload;
}
export const REQUEST_POSTS = 'REQUEST_POSTS';
export type REQUEST_POSTS = typeof REQUEST_POSTS;

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export type RECEIVE_POSTS = typeof RECEIVE_POSTS;

type RequestPostAction = SFAPayload<REQUEST_POSTS, {
  subreddit: string;
}>;

function requestPosts(subreddit: string): RequestPostAction {
  return {
    type: REQUEST_POSTS as typeof REQUEST_POSTS,
    payload: {
      subreddit,
    },
  };
}

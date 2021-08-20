import axios from "axios"
import {SERVICE_ENDPOINT} from '../constants/endpoint'

/**
 * action type
 */
const LIST_SUCCESS = 'LIST_SUCCESS'
const LIST_FAILURE = 'LIST_FAILURE'
const DESC_SUCCESS = 'DESC_SUCCESS'
const DESC_FAILURE = 'DESC_FAILURE'
const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
const COMMENT_FAILURE = 'COMMENT_FAILURE'
const BLOG_SUCCESS = 'BLOG_SUCCESS'
const BLOG_FAILURE = 'BLOG_FAILURE'
/**
 * state
 */
const initState = {
  content: '',
  msg: '',
  tags: '',
  desc: {comment:  [{}]},
  commentSize: '',
  totalElements: 0
}

/**
 * reducer
 * @param {*} state
 * @param {*} action
 */
export function blog(state=initState, action: any) {
  switch(action.type) {
    case LIST_SUCCESS:
      return {
        ...state,
        content: action.payload.data,
        msg: action.payload.msg,
        totalElements: action.payload.data.length
      }
    case DESC_SUCCESS:
      return {
        ...state,
        desc: action.payload.data,
        tags: action.payload.data.tags,
        msg: action.payload.msg
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        commentSize: state.desc.comment.push({
          content: action.newComment,
          created_at: +Date.now(),
          user: {
            username: action.username
          }
        })
      }
    case LIST_FAILURE:
    case DESC_FAILURE:
    case COMMENT_FAILURE:
      return {
        ...state,
        msg: action.payload
      }
    case BLOG_SUCCESS:
      return {
        ...state,
        blog: action.payload.data,
        message: action.payload.message,
      }
    case BLOG_FAILURE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}

/**
 * action type
 */

function listSuccess(data: any) {
  return {
    type: LIST_SUCCESS,
    payload: data
  }
}

function listFailure(data: any) {
  return {
    type: LIST_FAILURE,
    payload: data
  }
}

function descSuccess(data: any) {
  return {
    type: DESC_SUCCESS,
    payload: data
  }
}

function descFailure(data: any) {
  return {
    type: DESC_FAILURE,
    payload: data
  }
}

function commentSuccess(data: any, comment: any, username: any) {
  return {
    type: COMMENT_SUCCESS,
    payload: data,
    newComment: comment,
    username: username
  }
}

function commentFailure(data: any) {
  return {
    type: COMMENT_FAILURE,
    payload: data
  }
}

function blogSuccess(data: any) {
  return {
    type: BLOG_SUCCESS,
    payload: data,
  }
}

function blogFailure(data: any) {
  return {
    type: BLOG_FAILURE,
    payload: data
  }
}

/**
 * aysnc function
 */

export function getBlogList({
  offset,
  limit,
  tags,
  catalog_id,
  order
}: {[key: string]: any}) {
  return (dispatch: any) => {
    axios.get(`${SERVICE_ENDPOINT}/api/bloglist`, {
      params: {
        offset,
        limit,
        tags,
        catalog_id,
        order
      }
    })
      .then((res: any) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(listSuccess(res.data))
        } else {
          dispatch(listFailure(res.data.msg))
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}

export function getBlogDesc(id: number) {
  return (dispatch: any) => {
    axios.get(`/api/blog/${id}`)
      .then((res: any) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(descSuccess(res.data))
        } else {
          dispatch(descFailure(res.data.message))
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}

export function createComment({
  blog_id,
  user_id,
  content,
  username
}: {[key: string]: any}) {
  return (dispatch: any) => {
    axios.post('/api/users/comment', {
      blog_id,
      user_id,
      content
    })
    .then((res: any) => {
      if(res.status === 201 && res.data.code === 0) {
        dispatch(commentSuccess(res.data, content, username))
      } else {
        dispatch(commentFailure(res.data.message))
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
  }
}

export function createBlog({
    blog = {
      published: true,
      blog: '',
      title: '',
      content: '',
      description: ''
    }
}) {
  return (dispatch: any) => {
    axios.post(`${SERVICE_ENDPOINT}/api/create`, {
      title: blog.title,
      description: blog.description,
      published: blog.published,
      content: blog.content
    })
        .then((res: any) => {
          if(res.status === 201 && res.data.code === 201) {
            dispatch(blogSuccess(res.data.message))
          } else {
            dispatch(blogFailure(res.data.message))
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
  }
}


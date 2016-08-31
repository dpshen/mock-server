import {CALL_API} from '../libs/api'
import {Schemas} from '../libs/schema'

export const GET_GROUP_LIST = 'GET_GROUP_LIST'
export const GET_GROUP_LIST_SUCCESS = 'GET_GROUP_LIST_SUCCESSS'
export const GET_GROUP_LIST_FAILURE = 'GET_GROUP_LIST_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchGroupList() {
    return (dispatch, getState) => {
        return dispatch({
            [CALL_API]: {
                types: [GET_GROUP_LIST, GET_GROUP_LIST_SUCCESS, GET_GROUP_LIST_FAILURE],
                endpoint: `/getGroupList`,
                schema: Schemas.GROUP_ARRAY
            }
        })
    }
}


export const GET_GROUP = 'GET_GROUP'
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESSS'
export const GET_GROUP_FAILURE = 'GET_GROUP_FAILUREE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchGroup(groupId) {
    return (dispatch, getState) => {
        return dispatch({
            [CALL_API]: {
                types: [GET_GROUP, GET_GROUP_SUCCESS, GET_GROUP_FAILURE],
                endpoint: `getGroup?_id=${groupId}`,
                schema: Schemas.GROUP
            }
        })
    }
}

export const GET_API_LIST = 'GET_API_LIST'
export const GET_API_LIST_SUCCESS = 'GET_API_LIST_SUCCESSS'
export const GET_API_LIST_FAILURE = 'GET_API_LIST_FAILUREE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchApiList(groupId) {
    return (dispatch, getState) => {
        return dispatch({
            [CALL_API]: {
                types: [GET_API_LIST, GET_API_LIST_SUCCESS, GET_API_LIST_FAILURE],
                endpoint: `getApiList?groupId=${groupId}`,
                schema: Schemas.API_ARRAY
            }
        })
    }
}

export const GET_API = 'GET_API'
export const GET_API_SUCCESS = 'GET_API_SUCCESSS'
export const GET_API_FAILURE = 'GET_API_FAILUREE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchApi(apiId) {
    return (dispatch, getState) => {
        return dispatch({
            [CALL_API]: {
                types: [GET_API, GET_API_SUCCESS, GET_API_FAILURE],
                endpoint: `getApi?_id=${apiId}`,
                schema: Schemas.API
            }
        })
    }
}

export const ADD_API = 'ADD_API'
export const ADD_API_SUCCESS = 'ADD_API_SUCCESSS'
export const ADD_API_FAILURE = 'ADD_API_FAILUREE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function postApi(formData) {
    return (dispatch, getState) => {
        return dispatch({
            [CALL_API]: {
                types: [ADD_API, ADD_API_SUCCESS, ADD_API_FAILURE],
                endpoint: `addApi`,
                schema: Schemas.API,
                option: {
                    method: "POST",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    body: formData
                }
            }
        })
    }
}
import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {groups: {}, apis: {}}, action) {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const {type, error} = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
    groupById: paginate({
        mapActionToKey: action => action._id,
        types: [
            ActionTypes.GET_GROUP,
            ActionTypes.GET_GROUP_SUCCESS,
            ActionTypes.GET_GROUP_FAILURE
        ]
    }),
    apiById: paginate({
        mapActionToKey: action => action._id,
        types: [
            ActionTypes.GET_API,
            ActionTypes.GET_API_SUCCESS,
            ActionTypes.GET_API_FAILURE
        ]
    })
})

const rootReducer = combineReducers({
    entities,
    pagination,
    errorMessage,
    routing
})

export default rootReducer

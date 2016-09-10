import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {groups: {}, apis: {}}, action) {
    if (action.response && action.response.entities) {
        action.response.entities.actionType = action.type;
        action.response.entities.actionTime = new Date().getTime();
        return merge({}, state, action.response.entities)
    }

    return state
}

// Updates error message to notify about the failed fetches.
function error(state = null, action) {
    const {type, error} = action

    if (error) {
        return {type, message:error}
    }

    return {type: null, message:""}
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
    error,
    routing
})

export default rootReducer

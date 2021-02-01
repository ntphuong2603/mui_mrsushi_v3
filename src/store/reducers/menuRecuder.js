import { ACTIONS } from "../actionTypes";

export default function menuReducer(state={}, action){
    switch (action.type){
        case ACTIONS.GET_CATEGORY:
            return {...state, ...action.payload}
        case ACTIONS.GET_MENU:
            return {...state, ...action.payload}
        case ACTIONS.ADD_QTY:
            return {...state, ...action.payload}
        case ACTIONS.SUB_QTY:
            return {...state, ...action.payload}
        case ACTIONS.PUT_ORDER:
            return {...state, ...action.payload}
        default:
            return {...state, ...action.payload}
    }
}
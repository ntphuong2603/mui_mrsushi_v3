import { ACTIONS } from "../actionTypes";

export default function CartReducer(state={},action){
    switch (action.type){
        case ACTIONS.CANCEL_ORDER:
            return {...state, ...action.payload}
        case ACTIONS.PLACE_ORDER:
            return {...state, ...action.payload}
        default:
            return {...state, ...action.payload}
    }
}
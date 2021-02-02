import { ACTIONS } from "../actionTypes";
import * as cartApi from '../../apis/cartApi'

export const adjustQuantityOrder = (shoppingCart, menu, isAdd) => ({
    type: ACTIONS.ADJ_QTY_ORDER,
    payload: cartApi.adjustQuantityOrder(shoppingCart, menu, isAdd)
})

export const cancelOrder = () => ({
    type: ACTIONS.CANCEL_ORDER,
    payload: cartApi.cancelOrder()
})

export const placeOrder = (orders, customerInfo) => ({
    type: ACTIONS.PLACE_ORDER,
    payload: cartApi.placeOrder(orders, customerInfo)
})
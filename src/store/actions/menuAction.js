import { ACTIONS } from "../actionTypes";
import * as menuApi from '../../apis/menuApi'

export const getCategory = () => ({
    type: ACTIONS.GET_CATEGORY,
    payload: menuApi.getCategory()
})

export const getMenu = (cat) => ({
    type: ACTIONS.GET_MENU,
    payload: menuApi.getMenu(cat)
})

export const addQuantity = (shoppingCart, menu, total) => ({
    type: ACTIONS.ADD_QTY,
    payload: menuApi.addQuantity(shoppingCart, menu, total)
})

export const subQuantity = (shoppingCart, menu, total) => ({
    type: ACTIONS.SUB_QTY,
    payload: menuApi.subQuantity(shoppingCart, menu, total)
})
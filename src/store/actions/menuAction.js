import { ACTIONS } from "../actionTypes";
import * as menuApi from '../../apis/menuApi'

export const getCategory = () => ({
    type: ACTIONS.GET_CATEGORY,
    payload: menuApi.getCategory()
})

export const getMenu = (menu, cat) => ({
    type: ACTIONS.GET_MENU,
    payload: menuApi.getMenu(menu, cat)
})

export const initQuantity = (quantity, menus) => ({
    type: ACTIONS.INIT_QTY,
    payload: menuApi.initQuantity(quantity, menus)
})

export const adjQuantity = (quantity, menu, isAdd) => ({
    type: ACTIONS.ADJ_QTY,
    payload: menuApi.adjustQuantity(quantity, menu, isAdd)
})

export const putOrder = (quantity, shoppingCart, menuCode) => ({
    type: ACTIONS.PUT_ORDER,
    payload: menuApi.putOrder(quantity, shoppingCart, menuCode)
})

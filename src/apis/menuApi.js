import axios from 'axios'

const URL = 'http://localhost:5000'

export const getCategory = async () => {
    try {
        const res = await axios.get(`${URL}/categories`)
        if (res.data){
            return {
                categories: res.data
            }
        }
    } catch (error){
        throw error
    }
}

export const getMenu = async (menus=[], cat=null) => {
    try{
        if (cat===null){
            return {
                menus: []
            }
        }

        const menuExist = menus.filter(menu=>menu.cat===cat)
        if (menuExist.length){
            return {
                menus: menus
            }
        } else {
            const res = await axios.get(`${URL}/menus?cat=${cat}`)

            if (res.data) {
                return {
                    menus: [...menus, ...res.data]
                }
            }
        }
    } catch (error){
        throw error
    }
}

export const initQuantity = (quantity=[], menus) =>{
    const init_quantity = quantity ? [] : quantity
    menus.forEach(menu=>{
        if (init_quantity.length === 0 || init_quantity.filter(selectedMenu=>selectedMenu.code===menu.code).length===0){
            init_quantity.push({ ...menu, qty: 1})
        }
    })

    return { quantity: init_quantity }
}

export const adjustQuantity = (quantity, menu, isAdd) => {
    const quantityMenu = quantity.filter(selectedMenu=>selectedMenu.code===menu.code)[0]
    quantityMenu.qty += isAdd ? 1 : -1
    return { quantity }
}

export const putOrder = (quantity, shoppingCart, menuCode) => {
    const orderCart = quantity.filter(menu=>menu.code===menuCode)[0]
    const orders = {}
    if (shoppingCart===undefined){
        orders.order = [{...orderCart}]
        orders.total = orderCart.qty
    } else {
        const existOrder = shoppingCart.order.filter(order=>order.code===menuCode)
        if (existOrder.length) {
            orders.order = [...shoppingCart.order.filter(order=>order.code!==menuCode),{...orderCart, qty: existOrder.qty + orderCart.qty}]
            orders.total = shoppingCart.total + orderCart.qty
        } else {
            orders.order = [...shoppingCart.order, {...orderCart, qty: orderCart.qty}]
            orders.total = shoppingCart.total + orderCart.qty
        }
    }
    return {
        shoppingCart: { ...orders},
        quantity : quantity.filter(menu=>menu.code !== menuCode)
    }
}
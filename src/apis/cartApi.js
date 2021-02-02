import axios from 'axios'

const URL = 'http://localhost:5000'

export const adjustQuantityOrder = (shoppingCart, menuCode, isAdd) => {
    const menu = shoppingCart.order.filter(menu=>menu.code===menuCode)[0]
    menu.qty += isAdd ? 1 : -1
    shoppingCart.total += isAdd ? 1 : -1
    return { shoppingCart }
}

export const cancelOrder = () => {
    return {
        shoppingCart: {
            order: [],
            total: 0
        }
    }
}

export const placeOrder = async (orders, customerInfo) => {

    try {
        const res_customer = await axios.post(`${URL}/customers`, customerInfo)
        if (res_customer.data){
            const order = {
                orders: orders.map(order=>({code:order.code, qty: order.qty})),
                date: Date.now(),
                customerID: res_customer.data.id,
            }
            const res = await axios.post(`${URL}/orders`,order)
            if (res.data){
                return {
                    orders: res.data
                }
            }
        }
    } catch (error){
        throw error
    }
}
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

export const getMenu = async (cat=null) => {
    try{
        if (cat===null){
            return {
                menus: []
            }
        }
        const res = await axios.get(`${URL}/menus?cat=${cat}`)

        if (res.data) {
            return {
                menus: res.data
            }
        }
    } catch (error){
        throw error
    }
}

export const addQuantity = (quantity=[], menu, total = 0) => {
    const quantityMenu = quantity.filter(selectedMenu=>selectedMenu.code===menu.code)
    if (quantityMenu.length === 0){
        quantityMenu.push({ ...menu, qty: 0})
    }
    return {
        quantity: [...quantity.filter(selectedMenu=>selectedMenu.code!==menu.code), { ...menu, qty: quantityMenu[0].qty + 1}],
        total: total + 1,
    }
}

export const subQuantity = (quantity=[], menu, total) => {
    const quantityMenu = quantity.filter(selectedMenu=>selectedMenu.code===menu.code)
    return {
        quantity: [...quantity.filter(selectedMenu=>selectedMenu.code!==menu.code), { ...menu, qty: quantityMenu[0].qty - 1}],
        total: total - 1,
    }
}
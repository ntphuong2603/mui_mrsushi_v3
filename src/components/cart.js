import { Button, ButtonBase, ButtonGroup, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ARROW } from '../constants/icons'
import * as cartActions from '../store/actions/cartAction'

const styles = makeStyles(theme=>({
    btn:{
        minWidth: '20%',
        maxWidth: '30%',
        margin: theme.spacing(1,0),
        padding: theme.spacing(0),
    },
    btnAdd:{
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}))

const Cart = () => {
    const classes = styles()
    const { shoppingCart } = useSelector(state=>state.menu)
    const dispatch = useDispatch()

    const adjustQuantityOrder = (menuCode,isAdd) => {
        dispatch(cartActions.adjustQuantityOrder(shoppingCart, menuCode,isAdd))
    }

    const cancelOrder = () => {
        dispatch(cartActions.cancelOrder())
    }

    const placeOrder = () => {
        dispatch(cartActions.placeOrder(shoppingCart.order))
        dispatch(cartActions.cancelOrder())
    }

    const orderList = () => (
        shoppingCart.order.map((menu,index)=>(
            <Grid container spacing={2}>
                <Grid item xs={5}> 
                    <ButtonBase>
                        <img alt='img' src={`https://picsum.photos/125?random=${index}`}/>
                    </ButtonBase>
                </Grid>
                <Grid item container xs={7} direction='column'>
                    <Grid item>
                        <Typography variant='h6'>{menu.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid item justify='space-between'>
                            <Button size='small' className={classes.btnAdd} variant='text'>Order</Button>
                            <Button className={classes.btn} variant='outlined' color='secondary'
                                onClick={()=>adjustQuantityOrder(menu.code, true)}>
                                    {ARROW.UP}
                            </Button>
                            <Button size='medium' className={classes.btn} variant='text'>{menu.qty}</Button>
                            <Button className={classes.btn} variant='outlined' color='primary'
                                disabled={menu.qty<=0} onClick={()=>adjustQuantityOrder(menu.code, false)}>
                                {ARROW.DOWN}
                            </Button>
                        </Grid>
                        <Typography align='right'>Price : $ {(menu.price.toFixed(2))}</Typography>
                        <Typography align='right'>Total : $ {(menu.price * menu.qty).toFixed(2)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        ))
    )
    return(
        <>
            {shoppingCart && orderList() }
            <ButtonGroup size='large' fullWidth disabled={!shoppingCart || shoppingCart.total===0}>
                <Button variant='contained' color='secondary' onClick={()=>{cancelOrder()}}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={()=>{placeOrder()}}>Place order</Button>
            </ButtonGroup>
        </>
    )
}

export default Cart;
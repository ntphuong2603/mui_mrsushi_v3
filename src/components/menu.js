import { Button, ButtonBase, ButtonGroup, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ARROW, ICON } from '../constants/icons';
import * as menuActions from '../store/actions/menuAction'
import { getFirtLetterCapital } from '../tools/strTools';

const styles = makeStyles(theme=>({
    formControl:{
        width: '100%',
        margin: theme.spacing(2,0),
    },
    paper:{
        margin: theme.spacing(1,1),
    },
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

const Menu = () => {
    const classes = styles()
    const { categories, menus, quantity, shoppingCart } = useSelector(state=>state.menu)
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(()=>{
        if (!categories) dispatch(menuActions.getCategory())
    },[])

    useEffect(()=>{
        if (selectedCategory) {
            dispatch(menuActions.getMenu(menus, selectedCategory))
            if (menus) dispatch(menuActions.initQuantity(quantity,menus))
        }
    },[selectedCategory, menus])

    const handleQuantity = (menu, isAdd) => {
        dispatch(menuActions.adjQuantity(quantity, menu, isAdd))
    }
    
    const handleShoppingCart = (menuCode) => {
        dispatch(menuActions.putOrder(quantity, shoppingCart, menuCode))
    }

    const getQuantity = (menuCode) => {
        if (quantity){
            const shoppingMenu = quantity.filter(menu=>menu.code === menuCode)
            if (shoppingMenu.length){
                return shoppingMenu[0].qty
            } else {
                return 0
            }
        }
        return 0
    }

    const menuProps = {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null,
    }
    
    const selectionCategory = () => (
        <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Select category</InputLabel>
            <Select
                value={selectedCategory}
                // onChange={(event)=>handelCategory(event)}
                onChange={(event)=>setSelectedCategory(event.target.value)}
                label='Select category'
                MenuProps={menuProps}>
                {categories && categories.map(cat=>(
                    <MenuItem value={cat}>{getFirtLetterCapital(cat)}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
    
    const menuList = () => (
        menus.filter(menu=>menu.cat===selectedCategory).map((menu,index)=>(
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
                        <Typography variant='h5' align='right'>$ {menu.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item justify='space-between'>
                        <Button size='large' className={classes.btnAdd} variant='contained' color='secondary' disabled={!getQuantity(menu.code)} onClick={()=>handleShoppingCart(menu.code)}>{ICON.ADD_SHOPPING_CART}</Button>
                        <Button className={classes.btn} variant='outlined' color='secondary'
                            onClick={()=>handleQuantity(menu,true)}>
                                {ARROW.UP}
                        </Button>
                        <Button size='medium' className={classes.btn} variant='text'>{getQuantity(menu.code)}</Button>
                        <Button className={classes.btn} variant='outlined' color='primary' 
                            disabled={!getQuantity(menu.code)} onClick={()=>handleQuantity(menu,false)}>
                            {ARROW.DOWN}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        ))
    )

    return(
        <>
            {selectionCategory()}
            {menus && menuList()}
        </>
    )
}

export default Menu;
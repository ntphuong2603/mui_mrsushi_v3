import { Button, ButtonBase, ButtonGroup, Container, FormControl, Grid, IconButton, InputLabel, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
// import { ExpandMore } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ARROW } from '../constants/menu-bar';
import * as menuActions from '../store/actions/menuAction'
import { getFirtLetterCapital } from '../tools/strTools';

const styles = makeStyles(theme=>({
    formControl:{
        width: '100%',
        margin: theme.spacing(2,0),
    },
    paper:{
        margin: theme.spacing(1,1),
    }
}))

const Menu = () => {
    const classes = styles()
    const { categories, menus, quantity, shoppingCart, total } = useSelector(state=>state.menu)
    const dispatch = useDispatch()
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(()=>{
        dispatch(menuActions.getCategory())
    },[])

    useEffect(()=>{
        dispatch(menuActions.getMenu(selectedCategory))
    },[selectedCategory])

    const handleQuantity = (menu, act) => {
        if (act==='add') dispatch(menuActions.addQuantity(quantity, menu))
        if (act==='sub') dispatch(menuActions.subQuantity(quantity, menu))
    }
    
    const handleShoppingCart = (menuCode) => {

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
        menus.map((menu,index)=>(
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
                    <Grid item >
                        <IconButton variant='contained' color='secondary'><AddShoppingCartIcon/></IconButton>
                        <IconButton color='primary' onClick={()=>handleQuantity(menu,'add')}>{ARROW.UP}</IconButton>
                        <IconButton disabled >{getQuantity(menu.code)}</IconButton>
                        <IconButton color='primary' disabled={!getQuantity(menu.code)} onClick={()=>handleQuantity(menu,'sub')}>{ARROW.DOWN}</IconButton>
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
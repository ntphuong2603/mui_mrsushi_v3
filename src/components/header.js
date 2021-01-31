import React, { useState } from 'react'
import { AppBar, Badge, Button, ClickAwayListener,  IconButton, makeStyles, Popover, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { MENU_BAR, MENU_ICON } from '../constants/menu-bar';
import { LinkContainer } from 'react-router-bootstrap'
import { ShoppingCart } from '@material-ui/icons';
import { useSelector } from 'react-redux';


const styles = makeStyles((theme)=>({
    grow:{
        flexGrow: 1,
    },
    title:{
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display: 'block'
        }
    },
    sectionDesktop:{
        '& > *': {margin: theme.spacing(1)},
        display: 'none',
        [theme.breakpoints.up('md')]:{
            display: 'flex'
        }
    },
    sectionMobile:{
        display: 'flex',
        [theme.breakpoints.up('md')]:{
            display: 'none'
        }
    },
    btn:{
        margin: theme.spacing(1,2),
        padding: theme.spacing(1,2)
    },
    menuStyle:{
        position: 'absolute',
        zIndex: 100,
    }
}))

const Header = () => {
    const classes = styles()
    const [selectedMenu, setSelectedMenu] = useState(MENU_BAR[0])
    const [anchorEle, setAnchorEle] = useState(null)
    const [menuID, setMenuID] = useState(null)
    const { total } = useSelector(state=>state.menu)
    
    const handleMenuMobile = (event = null) => {
        if (event === null){
            setAnchorEle(null)
            setMenuID(null)
        } else {
            setAnchorEle(event.currentTarget)
            setMenuID('menu1234567890')
        }
    }

    const getActiveButton = (menu) => (
        menu===selectedMenu ? 
        { color: 'secondary', variant: 'contained' }
        :
        { color: 'inherit', variant: 'text' }
    )
    
    const getPopoverPosition = () => ({
        anchorOrigin:{
            vertical: 'bottom',
            horizontal: 'right',
        },
        transformOrigin:{
            vertical: 'top',
            horizontal: 'right',
        }
    })

    const menu_desktop = () => (
        <div className={classes.sectionDesktop}>
            {MENU_BAR.map((menu)=>(
                <LinkContainer to={`/${menu}`} key={menu}>
                    <Button {...getActiveButton(menu)} onClick={()=>setSelectedMenu(menu)}>
                        {menu}
                    </Button>
                </LinkContainer>
            ))}
        </div>
    )

    const menu_mobile = () => (
        <ClickAwayListener onClickAway={()=>handleMenuMobile()}>
            <div className={classes.sectionMobile}>
                <IconButton color='inherit' aria-describedby={menuID} onClick={event=>handleMenuMobile(event)}>
                    <Badge badgeContent={total ? total : 0} showZero color='secondary' >
                        <ShoppingCart/>
                    </Badge>
                </IconButton>
                <IconButton color='inherit' aria-describedby={menuID} onClick={event=>handleMenuMobile(event)}>
                    <MenuIcon/>
                </IconButton>
                <Popover 
                    id={menuID} 
                    open={Boolean(anchorEle)}
                    anchorEl={anchorEle} 
                    onClose={()=>handleMenuMobile()}
                    {...getPopoverPosition()}
                    >
                    {MENU_BAR.map((menu,index)=>(
                        <div key={menu}><LinkContainer to={`/${menu}`}>
                            <Button {...getActiveButton(menu)} 
                                className={classes.btn}
                                startIcon={MENU_ICON[index]}
                                onClick={()=>{setSelectedMenu(menu); handleMenuMobile()}}>
                                { menu }
                            </Button>
                        </LinkContainer></div>
                    ))}
                </Popover>
            </div>
        </ClickAwayListener>
    )

    return(
        <AppBar position="sticky">
            <Toolbar>
                <Typography className={classes.title} variant='h5' noWrap>
                    Mr. Sushi Inc.
                </Typography>
                <div className={classes.grow}/>
                {menu_desktop()}
                {menu_mobile()}
            </Toolbar>
        </AppBar>
    )
}

export default Header;
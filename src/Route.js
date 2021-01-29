import React from 'react'
import Header from './components/header'
import Mainlayout from './components/mainlayout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/home'
import About from './components/about'
import Menu from './components/menu'
import Cart from './components/cart'
import Login from './components/login'

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Mainlayout>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/about' component={About}/>
                    <Route path='/menu' component={Menu}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Mainlayout>
        </BrowserRouter>
    )
}

export default Routes;
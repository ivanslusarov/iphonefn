import React from "react"
import { Provider } from "react-redux"
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./views/Main"
import NotFound from "./views/NotFound/NotFound"
import Iphones from "./views/Iphones"
import Ipads from './views/Ipads'
import Iwatchs from './views/Iwatchs'
import Macs from './views/Macs'
import Gajets from './views/Gajets'
import Accesoirs from './views/Accesoirs'
import Cart from './views/Cart'
import InfoCard from "./components/InfoCard"
import Order from './components/Order'
import { store } from "./redux"


const App = () => {
    return (
        
        <div>
            <Provider store={store}>
            <Menu />
            <Header />
            <Switch>
                <Route path="/" exact>
                    <Main />   
                </Route>
                <Route path="/iphones" exact>
                    <Iphones />   
                </Route>
                <Route path="/iphones/:name" >
                    <InfoCard/>
                </Route>
                <Route path="/ipads" exact>
                    <Ipads />   
                </Route>
                <Route path="/ipads/:name" >
                    <InfoCard/>
                </Route>
                <Route path="/iwatchs" exact>
                    <Iwatchs />   
                </Route>
                <Route path="/iwatchs/:name" >
                    <InfoCard/>
                </Route>
                <Route path="/macs" exact>
                    <Macs />   
                </Route>
                <Route path="/macs/:name" >
                    <InfoCard/>
                </Route>
                <Route path="/gajets" >
                    <Gajets />   
                </Route>
                <Route path="/accesoirs">
                    <Accesoirs />   
                </Route>
                <Route path="/cart">
                    <Cart />   
                </Route>
                <Route path="/order">
                    <Order />   
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
            <Footer />
        </Provider>
            </div>)
}

export default App
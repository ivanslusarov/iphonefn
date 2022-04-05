import React from "react";

import Hero from "../../components/Hero"
import Warning from "../../components/Warning"
import Delivery from "../../components/Delivery"
import Icom from '../../components/iCom'
import MakeOrder from "../../components/MakeOrder"

import img from './img/hero.jpg'

const Main = () => {
    return <main>
        <Hero heading={'Качественная техника'} imgurl={img}/>
        <Warning />
        <Delivery />
        <Icom />
        <MakeOrder />
    </main>
}

export default Main
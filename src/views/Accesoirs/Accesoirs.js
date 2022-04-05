import React from "react";
import Hero from "../../components/Hero";
import './Accesoirs.css'
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import img from './img/apple-3595603__340.webp'
import CardC from "../../components/CardC";
import OnTopBtn from "../../components/OnTopBtn";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import Loader from "../../components/Loader";

const { Search } = Input;
const axios = require('axios')
const Accesoirs = () => {
    
    const [accesoirs, setAccesoirs] = useState(null);
    const [showCards, setShowCards] = useState(15)
    const [searhForm, setSearchForm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('default')
    const [isLoaderShow, setIsLoaderShow] = useState(false)
    const selectOption = (e) => {
        setStatus(e.target.value)  
    }
    const onSearch = value => {
        setIsLoading(true)
        setSearchForm(value)
        setIsLoading(false)
    }
    
    const handleChange = (e) => {
        setSearchForm(e.target.value)
    }

    const showMoreBtn = () => {
        setShowCards(showCards+15)
    }
    
    useEffect(() => {
        switch (status) {
           case 'default':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/accesoirs')
                    .then(data => {
                        setAccesoirs(data.data.data.result)
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
           case 'expensive':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/accesoirs')
                    .then(data => {
                        setAccesoirs(data.data.data.result.sort((firstResult, secondResult) => secondResult.price - firstResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                   
                break
           case 'cheep':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/accesoirs')
                    .then(data => {
                        setAccesoirs(data.data.data.result.sort((firstResult, secondResult) => firstResult.price - secondResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
           default:
                break
        }
    }, [showCards, status])

    return <main style={{'backgroundColor': '#000'}}>
        <Hero heading={'Аксессуары'} imgurl={img} />
        {isLoaderShow&&<Loader/>}
        {!isLoaderShow&&<div className="inputGroup">
            <Search placeholder="Поиск по разделу" onSearch={onSearch} loading={isLoading} enterButton style={{ width: '280px' }} value={searhForm} onChange={handleChange} />
            <label htmlFor='price' className="label-price">сортировать</label>
            <select name='price' id='price' className="select" onChange={selectOption} defaultValue={status}>
                        <option value="default">По умолчанию</option>
                        <option value="expensive" >От дорогих</option>
                         <option value="cheep" >От дешевых</option>
                    </select>
            </div>}
        {!isLoaderShow&&<div className="Cover">
            {accesoirs && accesoirs.filter((iphone) => {
                return iphone.name.toLowerCase().includes(searhForm.toLowerCase())
            }).slice(0, showCards).map(accesoir => <CardC imgurl={accesoir.image} name={accesoir.name} description={accesoir.description} price={accesoir.price} key={ uuidv4()}/>)}</div>}
        {!isLoaderShow&&<button className="btn-showMore" onClick={showMoreBtn}>Показать еще</button>}
        <OnTopBtn />
    </main>
}

export default Accesoirs

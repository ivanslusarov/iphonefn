import React from "react";
import './Iwatchs.css'
import { useState, useEffect } from "react";

import OnTopBtn from "../../components/OnTopBtn";
import Hero from "../../components/Hero";
import img from './img/20210617_60caca8d53b2b.jpg'
import CardC from "../../components/Card/Card";
import Loader from "../../components/Loader";

import { Input } from 'antd';
import 'antd/dist/antd.css';
const axios = require('axios')
const { Search } = Input;

const Iwatchs = () => {
    const [iwatchs, setIwatchs] =  useState(null);
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
                axios.get('https://icomapple.herokuapp.com/api/v1/iwatchs')
                    .then(data => {
                        setIwatchs(data.data.data.result)
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
           case 'expensive':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/iwatchs')
                    .then(data => {
                        setIwatchs(data.data.data.result.sort((firstResult, secondResult) => secondResult.price - firstResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
           case 'cheep':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/iwatchs')
                    .then(data => {
                        setIwatchs(data.data.data.result.sort((firstResult, secondResult) => firstResult.price - secondResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            default: break
        }
    }, [showCards, status])
    return <main style={{'backgroundColor': '#000'}}>
        <Hero heading={'iWatch'} imgurl={img} />
        {isLoaderShow&& <Loader/>}
        {!isLoaderShow&&<div className="inputGroup">
        <Search placeholder="Поиск по разделу" onSearch={onSearch} loading={isLoading} enterButton style={{width: '280px'}} value={searhForm} onChange={handleChange}/>
        <select defaultValue={status} className="select" onChange={selectOption}>
                    <option value="default">По умолчанию</option>
                    <option value="expensive">От дорогих</option>
                     <option value="cheep">От дешевых</option>
                </select>
        </div>}
        
        {!isLoaderShow&&<div className="Cover">
            {iwatchs && iwatchs.filter((iwatch) => {
                return iwatch.name.toLowerCase().includes(searhForm.toLowerCase())
            }).slice(0, showCards).map(iwatch => <CardC props={iwatch} key={ iwatch.id}/>)}
        </div>}
        {!isLoaderShow&&<button className="btn-showMore" onClick={showMoreBtn}>Показать еще</button>}
        <OnTopBtn />
    </main>
}

export default Iwatchs

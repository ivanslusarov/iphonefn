import React from "react";
import './Iphones.css'
import { useState, useEffect } from "react";

import img from './img/apple-1867461__340.webp'

import { v4 as uuidv4 } from 'uuid'
import Hero from "../../components/Hero";
import CardC from "../../components/Card/Card";
import OnTopBtn from "../../components/OnTopBtn";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import Loader from "../../components/Loader";

const { Search } = Input;

const axios = require('axios')

const Iphones = () => {
    const [iphones, setIphones] = useState(null);
    const [showCards, setShowCards] = useState(15);
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
                axios.get('https://icomapple.herokuapp.com/api/v1/iphones')
                    .then(data => {
                        setIphones(data.data.data.result)
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            case 'expensive':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/iphones')
                    .then(data => {
                        setIphones(data.data.data.result.sort((firstResult, secondResult) => secondResult.price - firstResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            case 'cheep':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/iphones')
                    .then(data => {
                        setIphones(data.data.data.result.sort((firstResult, secondResult) => firstResult.price - secondResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            default: break
        }
        
    },[showCards, status])
    
    return <main style={{'backgroundColor': '#000'}}>
        <Hero heading={'Айфоны'} imgurl={img} />
        {isLoaderShow&& <Loader/>}
            {!isLoaderShow&&<div className="inputGroup">
                <Search placeholder="Поиск по разделу" onSearch={onSearch} loading={isLoading} enterButton style={{ width: '280px' }} value={searhForm} onChange={handleChange} className='SearchForm'/>
                <select defaultValue={status} className="select" onChange={selectOption}>
                    <option value="default">По умолчанию</option>
                    <option value="expensive">От дорогих</option>
                     <option value="cheep">От дешевых</option>
                </select>
            </div>}
        
        {!isLoaderShow&&<div className="Cover">
            {iphones && iphones.filter((iphone) => {
                return iphone.name.toLowerCase().includes(searhForm.toLowerCase())
            }).slice(0, showCards).map(iphone => <CardC props={iphone} key={uuidv4()} />)}
        </div>}
{       !isLoaderShow&& <button className="btn-showMore" onClick={showMoreBtn}>Показать еще</button>
}        <OnTopBtn />
    </main>
}

export default Iphones

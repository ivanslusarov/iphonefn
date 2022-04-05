import React from "react";
import './Gajets.css'
import { useState, useEffect } from "react";

import img from './img/istockphoto-1080261986-170667a.jpg'
import Hero from "../../components/Hero";
import CardC from "../../components/CardC";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import OnTopBtn from '../../components/OnTopBtn'
import Loader from "../../components/Loader";
const { Search } = Input;

const axios = require('axios')

const Gajets = () => {
    const [gajets, setGajets] = useState(null);
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
                axios.get('https://icomapple.herokuapp.com/api/v1/gajets')
                    .then(data => {
                        setGajets(data.data.data.result)
                        setIsLoaderShow(false)
                    })
                    .then(setIsLoaderShow(false))
                    .catch(e => console.log(e))
                break
            case 'expensive':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/gajets')
                    .then(data => {
                        setGajets(data.data.data.result.sort((firstResult, secondResult) => secondResult.price - firstResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            case 'cheep':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/gajets')
                    .then(data => {
                        setGajets(data.data.data.result.sort((firstResult, secondResult) => firstResult.price - secondResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            default: break
        }
    }, [showCards, status])
    return <main style={{'backgroundColor': '#000'}}>
        <Hero heading={'Гаджеты'} imgurl={img} />
        {isLoaderShow&&<Loader/>}
        {!isLoaderShow&&<div className="inputGroup">
        <Search placeholder="Поиск по разделу" onSearch={onSearch} loading={isLoading} enterButton style={{width: '280px'}} value={searhForm} onChange={handleChange}/>
        <select defaultValue={status} className="select" onChange={selectOption}>
                    <option value="default">По умолчанию</option>
                    <option value="expensive">От дорогих</option>
                     <option value="cheep">От дешевых</option>
                </select>
            </div>}
        {!isLoaderShow&&<div className="Cover">
            {gajets && gajets.filter((gajet) => {
                return gajet.name.toLowerCase().includes(searhForm.toLowerCase())
            }).slice(0,showCards).map(gajet => <CardC imgurl={gajet.image} name={gajet.name} description={gajet.description} price={gajet.price} key={ gajet.id} />)}
        </div>}
        {!isLoaderShow&&<button className="btn-showMore" onClick={showMoreBtn}>Показать еще</button>}
        <OnTopBtn />
        
    </main>
}

export default Gajets

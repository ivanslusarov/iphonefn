import React from "react";
import './Ipads.css'
import { useState, useEffect } from "react";

import Hero from "../../components/Hero";
import CardC from "../../components/Card/Card";

import img from './img/technology-2608742__340.jpg'
import OnTopBtn from "../../components/OnTopBtn";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import Loader from "../../components/Loader";

const { Search } = Input;

const axios = require('axios')
    
const Ipads = () => {
    const [ipads, setIpads] =  useState(null);
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
                axios.get('https://icomapple.herokuapp.com/api/v1/ipads')
                .then(data => {
                        setIpads(data.data.data.result)
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))

                break
            case 'expensive':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/ipads')
                    .then(data => {
                        setIpads(data.data.data.result.sort((firstResult, secondResult) => secondResult.price - firstResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            case 'cheep':
                setIsLoaderShow(true)
                axios.get('https://icomapple.herokuapp.com/api/v1/ipads')
                    .then(data => {
                        setIpads(data.data.data.result.sort((firstResult, secondResult) => firstResult.price - secondResult.price))
                        setIsLoaderShow(false)
                    })
                    .catch(e => console.log(e))
                break
            default:
                setIsLoaderShow(false)
                break
            }
        },[showCards, status])
        return <main style={{ 'backgroundColor': '#000' }}>

        <Hero heading={'Айпады'} imgurl={img} />
        {isLoaderShow&& <Loader/>}
        {!isLoaderShow&&<div className="inputGroup">
        <Search placeholder="Поиск по разделу" onSearch={onSearch} loading={isLoading} enterButton style={{ width: '280px' }} value={searhForm} onChange={handleChange} />
        <select defaultValue={status} className="select" onChange={selectOption}>
                    <option value="default">По умолчанию</option>
                    <option value="expensive">От дорогих</option>
                     <option value="cheep">От дешевых</option>
                </select>
            </div>}
        {!isLoaderShow&&<div className="Cover">
            {ipads && ipads.filter((ipad) => {
                return ipad.name.toLowerCase().includes(searhForm.toLowerCase())
            }).slice(0,showCards).map(ipad => <CardC props={ipad} key={ ipad.id}/>)}
        </div>}
        {!isLoaderShow&&<button className="btn-showMore" onClick={showMoreBtn}>Показать еще</button>}
        <OnTopBtn />
    </main>
}

export default Ipads

import React from "react";
import './OnTopBtn.css'
import { useEffect, useState } from "react";
import {BiArrowFromBottom} from 'react-icons/bi'


const ScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}



const OnTopBtn = () => {
    const [isVisable, setIsVisable] = useState(false)

    const tougleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisable(true)
        } else {
            setIsVisable(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', tougleVisibility)

        return () => {
            window.removeEventListener('scroll', tougleVisibility)
        }
    }, [])
    return <div className="OnTop" onClick={ScrollToTop} >
        <BiArrowFromBottom className={ 
            isVisable? 'show' : 'hide'
        }/><br />
    </div>
}
export default OnTopBtn
import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemInCart } from "../../redux/cart/reducer";
import Hero from "../Hero";
import './InfoCard.css'
import img from './img/home-office-g4a08adc61_1920.jpg'
import { Toast } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import OnTopBtn from "../OnTopBtn";

const InfoCard = () => {
  const [info, setInfo ]= useState([])
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.itemsInCart)
  const [show, setShow] = useState(false);
  const isItemInCart = items.some(item => item.name === info.name)
  const [isLoader, setIsLoader] = useState(true)
  
  const location = useLocation()
  axios.get(`https://icomapple.herokuapp.com/api/v1${location.pathname}`).then(data => {
    setInfo(data.data.data.result)
    setIsLoader(false)
  })
    
  
  const obj = {
    imgurl: info.image,
    name: info.name,
    price: info.price,
  }
  
  const onClickOnBuyBtn = (e) => {
    if (!isItemInCart) {
      e.stopPropagation()
      dispatch(setItemInCart(obj))
    }
    setShow(true)
  }
    return (
        <main className="infoPage">
        <Hero heading={'Техника'} imgurl={img} />  
        {isLoader&&<Loader/>}
        {!isLoader&&<section className="infoPage-product">
          <h2 className="infoPage-product-name">{info.name}</h2>
          <div className="infoPage-content">
            <img src={info.image} alt={info.name} className="infoPage-img"/>
            <div className="infoPage-content-right">
              <h3 className="infoPage-product-modalName" >{info.modalName}</h3>
              <p className="infoPage-fulDescription">{info.fulDescription}</p>
              </div></div>
                <h3 className="characteries-name">Характеристики:</h3>
              <ul className="characteries">
                {info.camera&&<li className="characteries-item">
                  <p className="camera-heading">Камера:</p>
                  <p className="camera">{info.camera}</p>
                </li>}
                <li className="characteries-item">
                  <p className="model-heading">Модель:</p>
                  <p className="model">{info.model}</p>
                </li>
                <li className="characteries-item">
                  <p className="defence-heading">Особенность:</p>
                  <p className="defence">{info.defence}</p>
                </li>
                <li className="characteries-item">
                  <p className="diagonal-heading">Габариты:</p>
                  <p className="diagonal">{info.diagonal}</p>
                </li>
                <li className="characteries-item">
                  <p className="color-heading">Цвет:</p>
                  <p className="color">{info.color}</p>
                </li>
                <li className="characteries-item">
                  <p className="memory-heading">Память:</p>
                  <p className="memory">{info.memory}</p>
                </li>
                {info.oMemory&&<li className="characteries-item">
                  <p className="camera-heading">Оперативная память:</p>
                  <p className="camera">{info.oMemory}</p>
                </li>}
                {info.weight&&<li className="characteries-item">
                  <p className="camera-heading">Вес:</p>
                  <p className="camera">{info.weight}</p>
                </li>}
                {info.time&&<li className="characteries-item">
                  <p className="camera-heading">Питание:</p>
                  <p className="camera">{info.time}</p>
                </li>}
              </ul>
              <div className="price-block">
            <p className="notPrice">{Math.round(info.price + info.price / 10)} RUB</p>
            <p className="discont-price">{ info.price} RUB</p>
              </div>
              <button className='cards-btn infoBuyBtn' onClick={onClickOnBuyBtn}>В корзину</button>
              <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className='toast-info'>
              
                <Toast.Body >Товар успешно добавлен в корзину!</Toast.Body>
              </Toast>
            <OnTopBtn/>
        </section>}
    </main>
  );
}

export default InfoCard
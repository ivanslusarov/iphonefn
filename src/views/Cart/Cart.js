import React from "react";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import './Cart.css'
import img from './img/office-581131__340.webp'
import Hero from "../../components/Hero";
import {CloseSquareTwoTone} from '@ant-design/icons'
import { deleteItemFromCart } from "../../redux/cart/reducer";
import { useHistory } from "react-router-dom";

const Cart = () => {
    const items = useSelector(state => state.cart.itemsInCart)
    const dispatch = useDispatch()
    const totalPrice = items.reduce((acc, item) => acc += item.price, 0)
    const history = useHistory()
    const deleteItem = (e) => {
        const currentName = e.target.parentNode.parentNode.parentNode.name
        dispatch(deleteItemFromCart(currentName))
    }
    const handleOrderClick = () => {
        localStorage.setItem('totalPrice', JSON.stringify(Math.round(totalPrice/10)))
        history.push('/order')
    }
    return <main className="Busket">
        <Hero heading={'Техника'} imgurl={img} />

        {items.length>0 && items.map(item => <div className="Busket-cart" key={uuidv4()}>
            <img src={item.imgurl} className='Busket-cart-img' alt={item.name} />
            <div >
                <h3 className="Busket-cart-name">{item.name}</h3>
                <p className='Busket-cart-price'> Цена: {item.price} RUB</p>
            </div>
            <button className="delete-item-btn" onClick={deleteItem} name={item.name}>
                <CloseSquareTwoTone />
            </button>
        </div>)}
        {items.length>0 &&
        <div>
            <p className="price-busket">Всего: {totalPrice} RUB</p>
            <p className="price-busket">Предоплата: {Math.round(totalPrice / 10)} RUB</p>
            <Button className="Buy-Finaly-Btn" onClick={handleOrderClick}>Оформить заказ</Button>
            </div>}
        {items.length<1 && <h2 className="EmptyBusket">Ваша корзина пуста :(</h2>}
            
    </main > 
   
         

    

    
}

export default Cart
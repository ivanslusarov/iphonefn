import React from "react";
import Hero from "../Hero";
import './Order.css'
import img from './img/iphone-g8185be3f2_1920.jpg'
const Order = () => {
    const price = localStorage.getItem('totalPrice')
    const handleClickForm = (e) => {
        e.preventDefault()
    }
    return <main className="order-page">
        <Hero heading='Техника' imgurl={img} />
        <section className="order-content">
            <h2 className="order-heading">Оформление заказа</h2>
            <form className="order-form">
                <ul className="input-list">
                <li className="input-list-item">
                    <label for='name'>Имя</label>
                    <input type='text' name='name' placeholder='Имя' id='name'/>
                </li>
                <li className="input-list-item">
                <label for='middlename'>Отчество</label>
                <input type='text' name='middlename' placeholder='Отчество' id='middlename' />
                </li>
                <li className="input-list-item">
                <label for='surname'>Фамилия</label>
                <input type='text' name='surname' placeholder='Фамилия' id='surname' />
                </li>
                <li className="input-list-item">
                <label for='region'>Регион</label>
                <input type='text' name='region' placeholder='Регион' id='region' />
                </li>
                <li className="input-list-item">
                <label for='city'>Город</label>
                <input type='text' name='city' placeholder='Город' id='city' />
                </li>
                <li className="input-list-item">
                <label for='street'>Адрес доставки</label>
                <input type='text' name='street' placeholder='Улица' id='street' />
                </li>
                <li className="input-list-item">
                <label for='street'>Телефон</label>
                <input type='tel' name='street' placeholder='Телефон' id='street' />
                </li>
                <li className="input-list-item">
                <label for='street'>Електронная почта</label>
                <input type='text' name='street' placeholder='Почта' id='street'/>
                </li>
                </ul>
                <div className="order-price-block">
                    <p className="price-name">Предоплата:</p>
                    <p className="price-count">{JSON.parse(price)} Руб</p>
                </div>
                <button type="submit" className="pay-btn" onClick={handleClickForm}>Оплатить</button>
            </form>
        </section>
    </main>
}

export default Order
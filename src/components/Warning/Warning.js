import React from "react";
import './Warning.css'
import { v4 as uuidv4 } from 'uuid';
const Warning = () => {
    return <section className="Warning">
        <h2 className="warning-heading">Внимание!</h2>
        <p className="warning-text">В связи с санкциями, в работе компании внесены некоторые изменения:</p>
        <ul className="warning-list">
            <li className="warning-item" key={uuidv4()}>Работаем только в сфере интернет торговли</li>
            <li className="warning-item" key={uuidv4()}>На складах остались только те товары, которые есть на сайте</li>
            <li className="warning-item" key={uuidv4()}>В одни руки только одну единицу товара</li>
            <li className="warning-item" key={uuidv4()}>Предоплата 10% принимается на QIWI, остальное на почте</li>
            <li className="warning-item" key={uuidv4()}>Доставка только по территории РФ!</li>
        </ul>
    </section>
}

export default Warning
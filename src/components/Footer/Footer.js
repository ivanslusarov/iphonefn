import React from 'react';
import './Footer.css';
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
      <footer className='footer'>
            <h2 className='footer-heading'>iCom</h2>
            <div className='footer-block'>
                <div className='footer-production'>
                    <h3 className='production-heading'>Продукция</h3>
                    <ul className='footer-Plist'>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/iphones'> iPhone</Link>
                        </li>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/ipads'> iPad</Link>
                        </li>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/iwatchs'> iWatch</Link>
                        </li>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/macs'> Mac</Link>
                        </li>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/gajets'> Гаджеты</Link>
                        </li>
                        <li className='footer-Pitem' key={uuidv4()}>
                            <Link to='/accesoirs'> Аксессуары</Link>
                        </li>
                    </ul>
                </div>
                <div className='footer-contacts'>
                    <h3 className='production-heading'>Контакты</h3>
                    <ul className='contact-list'>
                        <li className='contact-item' key={uuidv4()}>
                            <a href="mailto:abc@example.com">icom@mail.ru</a>
                        </li>
                    <li className='contact-item' key={uuidv4()}>
                            <a href="tel:+74951234567">+7 (495) 123-45-67</a>
                        </li>
                    </ul>
                </div>
            </ div>
      </footer>
    )
}

export default Footer
import React from 'react';
import 'antd/dist/antd.css';
import './Card.css';
import { Button, Card, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setItemInCart } from '../../redux/cart/reducer';

const CardC = ({ imgurl, name, description, price }) => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.itemsInCart)
  const isItemInCart= items.some(item=>item.name===name)
  const [show, setShow] = React.useState(false);

  const obj = {
    imgurl,
    name,
    price
  }
  const onClickOnBuyBtn = (e) => {
    if (!isItemInCart) {
      e.stopPropagation()
      dispatch(setItemInCart(obj))
    }
    setShow(true)
  }
    return <Card style={{ width: '18rem' }} className='cards'>
        <Card.Img variant="top" src={imgurl} style={{ width: '18rem' }}/>
  <Card.Body className='cards-body' style={{'position':'relative'}}>
            <Card.Title className='cards-name'>{name}</Card.Title>
    <Card.Text className='cards-price-accesoir'>
                <p>{description}</p>
                <p className='cards-price'>{ price } RUB</p>
    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ 'backgroundColor': '#1890ff',  'borderRadius':'6px', 'padding': '10px 20px', 'position':'absolute', 'bottom':'30%', 'left':'0', 'zIndex': '10'}} >
          
            <Toast.Body >Товар успешно добавлен в корзину!</Toast.Body>
        </Toast>
        </Card.Text>
    <div className='btn-accesoir'>
      <Button variant="primary" className='cards-btn' onClick={onClickOnBuyBtn}>В корзину</Button> 
    </div>
  </Card.Body>
</Card>
} 

export default CardC
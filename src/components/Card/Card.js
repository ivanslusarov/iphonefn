import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setItemInCart } from '../../redux/cart/reducer';
import 'antd/dist/antd.css';
import './Card.css';

const CardC = ({ props }) => {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.itemsInCart)
  const isItemInCart= items.some(item=>item.name===props.name)
  const [show, setShow] = useState(false);
  const history = useHistory()

  const obj = {
    imgurl: props.image,
    name :props.name,
    price : props.price,
  }
  
  const handleInfoClick = () => {
    history.push(`/${props.item}/${props.name.split(' ').join('-')}`)
  }
  const onClickOnBuyBtn = (e) => {
    if (!isItemInCart) {
      e.stopPropagation()
      dispatch(setItemInCart(obj))
    }
    setShow(true)    
  }
  
    return <Card style={{ width: '18rem' }} className='cards' key={obj.id}>
      <Card.Img variant="top" src={obj.imgurl} style={{ 'width': '18rem'}} className='card-img'/>
      <Card.Body className='cards-body' style={{'position':'relative'}}>
        <Card.Title className='cards-name'>{obj.name}</Card.Title>
        <Card.Text className='cards-price-accesoir'>
          <p>{props.description}</p>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ 'backgroundColor': '#1890ff',  'borderRadius':'6px', 'padding': '10px 20px', 'position':'absolute', 'bottom':'30%', 'left':'0', 'zIndex': '10'}} >
          
            <Toast.Body >Товар успешно добавлен в корзину!</Toast.Body>
        </Toast>
          <div className="card-price-block">
            <p className="card-notPrice">{Math.round(props.price + props.price / 10)} RUB</p>
            <p className="card-discont-price">{ props.price} RUB</p>
          </div>
        </Card.Text>
        <div className='btn-group'>
      
          <Button variant="primary" className='cards-btn' onClick={onClickOnBuyBtn}>В корзину</Button> <br />
          <Button variant="secondary" className=' btn-char' onClick={handleInfoClick}>О товаре</Button>
        </div>
      </Card.Body>
      
    </Card>
  }


export default CardC
import Button from "@restart/ui/esm/Button";
import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increateQuantity } from '../redux/actions/cartAction';
function CartCompCard({item})
 {
     const dispatch = useDispatch()
     const quantityDecreaseHandler =()=>{
         dispatch(decreaseQuantity(item.id));
     }

     const quantityIecreaseHandler =()=>{
        dispatch(increateQuantity(item.id))
     }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img  width="150" height="200" variant="top" src={item?.image?`http://localhost:5000/${item.image}`:'https://fcw.com/-/media/GIG/FCWNow/Topics/Concepts/smiley.png'} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
         {item.price}
        </Card.Text>
        <Card.Text>
        <Button style={{marginRight:"5px"}} onClick={quantityDecreaseHandler} variant="primary">-</Button>
            quantity:{item.quantity}
        <Button  style={{marginLeft:"5px"}} onClick={quantityIecreaseHandler}variant="primary">+</Button>
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default CartCompCard;

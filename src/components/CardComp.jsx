import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, CloseButton, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle ,faPen} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import {confirm} from 'react-bootstrap-confirmation';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';
import { deleteProductWithID, getProducts } from '../redux/actions/productActions';
import { useSelector } from 'react-redux';


function CardComp({product,onCloseClicked}) {
  const {items} = useSelector(state => state.cart)
  const dispatch=useDispatch();
  let confirmResult;
 const history= useHistory()
 const display = async () => {
  confirmResult = await confirm('Are you really sure?');
  console.log('True if confirmed, false otherwise:', confirmResult);
  return confirmResult;
};

useEffect(() => {
  if(items?.length>0){
    const token = JSON.parse(localStorage.getItem("myToken"));
    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("items are",items)
    const data=JSON.stringify(items);
    axios.post("http://localhost:5000/api/cart/add",data,config).then((response)=>{
        console.log(response.data.cart.items)

       
        if(localStorage.getItem('cart')){
          localStorage.removeItem("cart")
          localStorage.setItem('cart', JSON.stringify(response.data.cart.items))
        }else{
          localStorage.setItem('cart', JSON.stringify(response.data.cart.items))
        }
       

    }).catch((error)=>{
      console.log("error is",error)
    })
  }
 
 
}, [items])
  const closeHandler = async()=>{
   //const result=window.confirm("are you sure you want to delete")
     let isTrue= await display();
     if(isTrue){
      await  dispatch(deleteProductWithID(product._id))
      await dispatch (getProducts())


      

      // const token = JSON.parse(localStorage.getItem("myToken"));
      // const config = {
      //   headers: {
      //     "content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };

      //  const result=await axios.delete(`http://localhost:5000/api/products/delete/${product._id}`,config)
      //  console.log(result);
      //  if(result.data.status===200){
       

        
      //   axios.get(
      //     "http://localhost:5000/api/products",
      //     config
      //   ).then((result)=>{
      //     if (result) {
      //       console.log("get products are", result.data.products);
      //       localStorage.setItem(
      //         "myProducts",
      //         JSON.stringify(result.data.products)
      //       );
      //       onCloseClicked()
           
      //     }
      //   }).catch((error)=>{
         
      //     console.log("error in getting product",error)
      //   });
         
      // }

     }else{

     }

  }
  const editHandler = ()=>{
    history.push({
      pathname: '/editProduct',
      state: { detail: product }
  });

  }
  const handleAddToCart =()=>{
    dispatch(addToCart(product))
  }
    return (
      <>   
        <Card key={product._id} bg='Success' style={{ width: "18rem",postion:"relative" }}>
       {/* { <CloseButton style={{position:"absolute",top:"0",right:"0"}}/>} */}
        <FontAwesomeIcon  style={{position:"absolute",top:"0",right:"0",color:"white",backgroundColor:"black"}} icon={faTimesCircle} onClick={closeHandler}/>
        <FontAwesomeIcon style={{position:"absolute",top:"0",right:"20",color:"white",backgroundColor:"black"}} icon={faPen} onClick={editHandler} />
        <Card.Img variant="top" width="150" height="200" src={product.image?`http://localhost:5000/${product.image}`:'https://fcw.com/-/media/GIG/FCWNow/Topics/Concepts/smiley.png'} />
        <Card.Body>
          <Card.Title>{product?.name}</Card.Title>
          <Card.Text>
          {product?.price}
          </Card.Text>
          <Card.Text>
          {product?.description}
          </Card.Text>
         
          
          <Button  onClick={handleAddToCart}variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
      </>
    )
}

export default CardComp

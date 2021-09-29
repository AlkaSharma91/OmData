import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions";
import CardComp from "./CardComp";

function Product() {
    const [allProducts, setAllProducts] = useState()
    let {products} = useSelector(state => state.productRedu)
    const dispatch = useDispatch();
    //const {userInfo} = useSelector(state => state.userProfile)
    
    //let products =localStorage.getItem("myProducts")?JSON.parse(localStorage.getItem("myProducts")):null;
     
    useEffect(() => {
      if(!products){
        dispatch(getProducts());

      }
     
    }, [])

   const onCloseClicked = () =>{
    //  products =localStorage.getItem("myProducts")?JSON.parse(localStorage.getItem("myProducts")):null;
    
    //   setAllProducts(products);
    //   products=allProducts;
   }
  return (
    <Container >
      <Row className="justify-content-center mt-5">
       
        {products?.map((product)=>{
          return(
          <Col lg="4" className="my-2">
         <CardComp product={product} onCloseClicked={onCloseClicked}></CardComp>
        </Col>

          )
        })}


      </Row>
    </Container>
  );
}

export default Product;

import React, { useEffect } from 'react'
import Button from "@restart/ui/esm/Button";
import axios from "axios";
import  { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
  
function EditProduct() {
const history = useHistory();
  const [image, setImage] = useState(null);
  const [loading,setLoading]=useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
  });
  
    const location = useLocation();
    useEffect(() => {
        if(location?.state?.detail){
            const product=location?.state?.detail
            console.log(location.state.detail);
            setProductDetails({
                name:product.name,
                price:product.price,
                description:product.description
            })
            //setImage(product.image);
            
          }
       
    }, [location])
    
      const handleSubmit = (e) =>{
          e.preventDefault();
          console.log("image is",image);
          const data = new FormData();
          data.append("name", productDetails.name);
          data.append("price", productDetails.price);
          data.append("description", productDetails.description);
          data.append("image", image);
          console.log(data);

          
          const config = {
            header: {
              "content-Type": "application/json",
            },
          };
      
          
             axios.patch(
              `http://localhost:5000/api/products/update/${location?.state?.detail._id}`,
              data,
              config
            ).then((response)=>{
              if (response.data.product) {
                console.log("data is", response?.data.product);
                 axios.get(
                  "http://localhost:5000/api/products",
                  config
                ).then((result)=>{
                  if (result) {
                    console.log("get products are", result.data.products);
                    localStorage.setItem(
                      "myProducts",
                      JSON.stringify(result.data.products)
                    );
                    setLoading(false)
                    history.push("/product");
                  }
                }).catch((error)=>{
                  setLoading(false)
                  console.log("error in getting product",error)
                });
                
              }else{
                setLoading(false)
                console.log("response is",response.err)
              }
      
            }).catch((error)=>{
              setLoading(false)
              console.log(error.response.data)
              console.log('error in updating product is',error.response.data.err)
              toast.error(error.response.data.err) ;
            });
           
      
            


      }

      const handleChange =(e)=>{
        const value = e.target.value;
        setProductDetails({
          ...productDetails,
          [e.target.name]: value,
        });
      }
    return (
        <>
         <Container>
      <Row
        style={{ height: "90vh"}}
        className="justify-content-center align-items-center"
      >
        <Col lg="4" style={{ backgroundColor:"cyan"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                value={productDetails.name}
                onChange={handleChange}
                type="text"
                placeholder="product name here"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                value={productDetails.price}
                onChange={handleChange}
                type="number"
                placeholder="enter price here"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={productDetails.description}
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                placeholder="choose file"
                
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
        </>
    )
}

export default EditProduct

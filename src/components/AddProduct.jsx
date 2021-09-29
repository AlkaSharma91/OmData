import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { addProduct, getProducts } from "../redux/actions/productActions";

function AddProduct() {
  const history = useHistory();
  const dispatch=useDispatch();


  const [image, setImage] = useState(null);
  const [loading,setLoading]=useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
  });
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(
      productDetails.name,
      productDetails.price,
      productDetails.description
    );
    const data = new FormData();
    data.append("name", productDetails.name);
    data.append("price", productDetails.price);
    data.append("description", productDetails.description);
    data.append("image", image);

   await dispatch(addProduct(data));
   await dispatch(getProducts())
   history.push("/products");

  
    // const token = JSON.parse(localStorage.getItem("myToken"));
    // const config = {
    //   headers: {
    //     "content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    
    //    axios.post(
    //     "http://localhost:5000/api/products/add",
    //     data,
    //     config
    //   ).then((response)=>{
    //     if (response.data.product) {
    //       console.log("data is", response?.data.product);
    //        axios.get(
    //         "http://localhost:5000/api/products",
    //         config
    //       ).then((result)=>{
    //         if (result) {
    //           console.log("get products are", result.data.products);
    //           localStorage.setItem(
    //             "myProducts",
    //             JSON.stringify(result.data.products)
    //           );
    //           setLoading(false)
    //           history.push("/products");
    //         }
    //       }).catch((error)=>{
    //         setLoading(false)
    //         console.log("error in getting product",error)
    //       });
          
    //     }else{
    //       setLoading(false)
    //       console.log("response is",response.err)
    //     }

    //   }).catch((error)=>{
    //     setLoading(false)
    //     console.log(error.response.data)
    //     console.log('error in adding product is',error.response.data.err)
    //     toast.error(error.response.data.err) ;
    //   });
     

      
    
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setProductDetails({
      ...productDetails,
      [e.target.name]: value,
    });
  };
  return (
    <>
    {loading?(<Spinner style={{margin:"0 auto"}} animation="border" variant="primary" />):(
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
    </Container>)}
    
  
    </>
  );
}

export default AddProduct;

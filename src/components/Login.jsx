import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { saveCart } from '../redux/actions/cartAction';
import { login, profile } from '../redux/actions/userAction';

function Login() {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const {isLogin,loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
      if(isLogin){
          console.log("login push called")
        
          history.push('/');
      }
    
  }, [isLogin])

  const loginHandler = async(e) =>{
      e.preventDefault()
      await dispatch(login(email,password));
    //   const token = JSON.parse(localStorage.getItem("myToken"));
    // const config = {
    //   headers: {
    //     "content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    //   axios.get('http://localhost:5000/api/cart',config).then((res)=>{
    //     console.log("response id--->",res)

    //     dispatch(saveCart(res.data.cart))
        
    //   }).catch((error)=>{
    //     console.log(error)
    //   })

     
      

  }
    return (
      <>
      <Container fluid="md">
         <Row className="justify-content-center">
          <Col lg={6}>   <form onSubmit={loginHandler}>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1"> Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3 ">
            <label for="exampleInputEmail1"> Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your passsword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form></Col>
         </Row>
      </Container>
      </>
        
     
      
    )
}

export default Login

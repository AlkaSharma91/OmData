import React, { useEffect } from "react";
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../redux/actions/userAction";
function Navbar_Comp() {

  const dispatch = useDispatch();
  const history=useHistory()
  const state = useSelector(state => state.cart)
  const numItems=state?state.items.length>0?state.items.length:null:null;
  const handleLogout = async () => {
   await  dispatch(logout());
   history.push('/login');
  };
  const { isLogin, loading, error, userInfo } = useSelector((state) => state.userLogin);
 
  
  const handleCartClicked =()=>{
    history.push('/cartComponent');

  }
 
  return (
    <> 
     <Navbar  expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      {userInfo && ( <Nav.Link href="/addProduct">Add Product</Nav.Link>)}
        <Nav.Link href="#home">Home</Nav.Link>
        {userInfo?(<Nav.Link onClick={handleLogout}>Logout</Nav.Link>):(
          <>
          <Nav.Link href="/register">Sign Up</Nav.Link>
          <Nav.Link href="/login">login </Nav.Link>
          </>
        )}
        {userInfo && (<Nav.Link  href="/products">Product</Nav.Link>)}
        
        {userInfo && ( <Nav.Link href="/addProduct">Add Product</Nav.Link>)}
       
        <Nav.Link onClick={handleCartClicked}>cart {numItems}</Nav.Link>
        
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
}

export default Navbar_Comp;

import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Switch } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarComp from "./components/NavbarComp";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./components/EditProduct";
import CartComponent from "./components/CartComponent";
import Child1 from "./components/Child1";
import { useState } from "react";
import { io } from "socket.io-client";

toast.configure();

//const SERVER = "http://localhost:5000";
export const socket=io.connect('http://localhost:5000',{ transports: ["websocket"] })

function App() {
 // socket.emit('storeClientInfo', JSON.stringify({ customId:"123" }));
  // socket.emit()
  // socket.on("welcome", data => {
  //   console.log("data", data);
   
  // });

  socket.on("event",data=>{
    console.log('welocme user',data)
  })

  const [val, setValue] = useState()
  const onButtonClicked =() =>{
    setValue(Math.random());
  }
 
  
  
  return (
    <div className="App">
      <NavbarComp></NavbarComp>
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/products" component={Product}></Route>
        <Route exact path="/addProduct" component={AddProduct}></Route>
        <Route exact path="/editProduct" component={EditProduct}></Route>
        <Route exact path="/cartComponent" component={CartComponent}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
      
     
     
    </div>
  );
}

export default App;

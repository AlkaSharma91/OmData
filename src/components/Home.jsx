import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveCart } from "../redux/actions/cartAction";
import { profile } from "../redux/actions/userAction";
import EditForm from "./EditForm";

function Home() {
  const dispatch = useDispatch();
  const history=useHistory();
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const state = useSelector((state) => {
    console.log(state);
    return state;
  });
  // let userInfo;
  let isLogin;
  // const userInfoFromStorage = localStorage.getItem("token")
  //   ? JSON.parse(localStorage.getItem("token"))
  //   : null;

  const getUserProfile = async () => {
   await dispatch(profile());

   const token = JSON.parse(localStorage.getItem("myToken"));
   const config = {
     headers: {
       "content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   };
     axios.get('http://localhost:5000/api/cart',config).then((res)=>{
       console.log("response id--->",res)

       dispatch(saveCart(res.data.cart))
       
     }).catch((error)=>{
       console.log(error)
     })

  };

  useEffect(() => {
    if(state?.userLogin.isLogin){
      console.log("state?.userLogin?.isLogin");
      getUserProfile();
    }else{
      setUserInfo(null);

    }
   
  }, [state?.userLogin.isLogin]);

  useEffect(() => {
    if(state.userLogin.isLogin){
    console.log("hello");
    setUserInfo(state?.userProfile?.userInfo);
    console.log(state.userProfile)
    history.push('/products');
    }
      

    
  }, [state?.userProfile?.userInfo]);

  const editClicked = () =>{
    setEdit(true);

  }
  // if (state.userUpdate?.isUpdated) {
  //   userInfo = state.userUpdate.userInfo;
  // } else if(state.userLogin?.isLogin) {
  //   userInfo = state.userLogin.isLogin;
  //   if(state.userProfile?.userInfo){
  //       userInfo = state.userProfile.userInfo;
  //     }
  // }

  //const {isLogin,loading, error, userInfo } = useSelector((state) => state.userLogin);
  //  const {loading, error, userInfo } = useSelector((state) => state.userProfile);

  return (
    <>
    {/* <div>
      <h1>
        {userInfo
          ? ` welcome ${userInfo?.name} your address is ${userInfo?.address}`
          : `welcome guest`}
      </h1>
      {userInfo ? (
          <div>
            <button onClick={editClicked}>Edit</button>
           
          </div>
        ) : (
          ""
        )}
    </div>
    {edit ? <EditForm></EditForm> : ""} */}
    </>
  );
}

export default Home;

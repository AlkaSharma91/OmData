import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userAction";
import NavbarComp from "./NavbarComp";

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const { loading, error, userInfo } = useSelector((state) => state.userLogin);
  return (
    <>
      <div>
        {userInfo ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            {" "}
            <Link to={"/register"}> Sign Up</Link>
            <Link to={"/login"}> Login</Link>
          </div>
        )}
      </div>
      <NavbarComp userInfo={userInfo}></NavbarComp>
    </>
  );
}

export default Header;

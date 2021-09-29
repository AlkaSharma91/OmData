import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { register } from "../redux/actions/userAction";
function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isRegister,loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conformPassword: "",
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [validationData, setvalidationData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conformPassword: "",
  });
  useEffect(() => {
      if(userInfo){
        history.push("/login")
        console.log("regiser  push called ")

      }
     
  }, [userInfo])
  let validationErrors = {};
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
   // handleValidation(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted successfully");
    dispatch(register(user.name,user.email,user.address,user.phone,user.password
        ))
  };

  const handleValidation = (e) => {
    console.log(e.target.name);
    if (e.target.name === "name") {
      if (user.name.length < 6) {
        setFormIsValid(false);
        validationErrors["name"] = "min 6 characters required";
      }
    } else if (e.target.name === "email") {
      if (e.target.value.length === 0) {
        setFormIsValid(false);
        validationErrors["email"] = "Cannot be empty";
      }
      if (typeof e.target.value !== "undefined") {
        let lastAtPos = e.target.value.lastIndexOf("@");
        let lastDotPos = e.target.value.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            e.target.value.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            e.target.value.length - lastDotPos > 2
          )
        ) {
          setFormIsValid(false);
          validationErrors["email"] = "Email is not valid";
        }
      }
    } else if (e.target.name === "phone") {
      if (e.target.value.length < 10) {
        setFormIsValid(false);
        validationErrors["phone"] = "please enter a valid number";
      }
    } else if (e.target.name === "password") {
      if (e.target.value.length < 5) {
        setFormIsValid(false);
        validationErrors["password"] =
          "password should be minimum 5 character long";
      }
    } else if (e.target.name === "confirmPassword") {
      if (user.password !== e.target.value) {
        setFormIsValid(false);
        validationErrors["conformPassword"] = "password should match";
      }
    }
    setvalidationData(validationErrors);
    console.log("validation data", validationData);
    console.log("validation error", validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setFormIsValid(true);
    }

    console.log("form is valid", formIsValid);
    return formIsValid;
  };

  return (
    <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputName"> Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Enter Your Name"
            value={user.name}
            name="name"
            onChange={handleChange}
          />
          {validationData.name ? (
            <div className="alert alert-danger">{validationData.name}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1"> Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Your Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {validationData.email ? (
            <div className="alert alert-danger">{validationData.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputAddress"
            placeholder="Enter Your Address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Phone</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPhone"
            placeholder="Enter Your Phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
          {validationData.phone ? (
            <div className="alert alert-danger">{validationData.phone}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            name="password"
            placeholder="Enter Your Password"
            value={user.password}
            onChange={handleChange}
          />
          {validationData.password ? (
            <div className="alert alert-danger">{validationData.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputEmail1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword"
            placeholder="Enter Your Password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          {validationData.conformPassword ? (
            <div className="alert alert-danger">
              {validationData.conformPassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <button type="submit" className="mt-2" >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;

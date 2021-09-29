import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux/actions/userAction';

function EditForm() {
    const { loading, userInfo, error } = useSelector((state) => state.userProfile);
    const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [address, setAddress] = useState(userInfo?.address);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [password, setPassword] = useState(userInfo?.password);
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
      e.preventDefault();
    dispatch(update(userInfo.id, name, email, address, phone, password));

  }
    return (
        <div className="col-md-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label for="exampleInputName"> Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Phone</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputEmail1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <button type="submit" className="mt-2">
            update
          </button>
        </form>
      </div>
    )
}

export default EditForm

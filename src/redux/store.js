

import {createStore,combineReducers, applyMiddleware} from 'redux';
import { userLoginReducer, userProfileReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducer';
import { productReducer } from './reducers/productReducer';
const reducer =combineReducers({
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer,
    userProfile:userProfileReducer,
    userUpdate:userUpdateReducer,
    cart:cartReducer,
    productRedu:productReducer,

})
const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
   
);
export default store;
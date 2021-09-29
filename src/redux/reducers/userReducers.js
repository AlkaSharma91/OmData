import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"

const userInfoFromStorage = localStorage.getItem("userData")
? JSON.parse(localStorage.getItem("userData"))
: null;

    const initialState ={isLogin:false,isUpdated:false,loading:false,userInfo:userInfoFromStorage,error:null}
    export const userRegisterReducer =(state=initialState,action) =>{
        switch(action.type){
            case USER_REGISTER_REQUEST:
                return {...state,loading:true}
            case USER_REGISTER_SUCCESS:
                return {...state,loading:false,userInfo:action.payload}
            case USER_REGISTER_FAIL:
                return {...state,loading:false,error:action.payload}     
           
            default:
                return state;    

        }
    }
    export const userLoginReducer = (state=initialState,action) =>{
        switch(action.type){
            case USER_LOGIN_REQUEST:
                return {...state,loading:true}
            case USER_LOGIN_SUCCESS:
                return {...state,isLogin:true, loading:false,userInfo:action.payload} 
            case USER_LOGIN_FAIL:
                return {...state, loading:false,error:action.payload}  
            case USER_LOGOUT:
                    return {...state,isLogin:false,userInfo:null}            
            default:
                return state;    
        }

    }
    export const userProfileReducer =(state=initialState,action) =>{
        switch(action.type){
            case USER_PROFILE_REQUEST:
                return {...state,loading:true}
            case USER_PROFILE_SUCCESS:
                return {...state,loading:false,userInfo:action.payload}
            case USER_PROFILE_FAIL:
                return {...state,loading:false,error:action.payload}     

            default:
                return state;    

        }
    }

    export const userUpdateReducer = (state=initialState,action) =>{
        switch(action.type){
            case USER_UPDATE_REQUEST:
                return {...state,loading:true}
            case USER_UPDATE_SUCCESS:
                return {...state,isUpdated:true,loading:false,userInfo:action.payload} 
            case USER_UPDATE_FAIL:
                return {...state,error:action.payload}  
                      
            default:
                return state;    
        }
        

    }
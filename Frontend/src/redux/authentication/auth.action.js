import axios from "axios";
import { api} from "../../config/api";
import { GET_ADMIN_DETAILS_FAILURE, GET_ADMIN_DETAILS_REQUEST, GET_ADMIN_DETAILS_SUCCESS, GET_USER_DETAILS_FAILURE, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, 
         GET_USER_FAILURE, 
         GET_USER_REQUEST, 
         GET_USER_SUCCESS, 
         LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_ADMIN_FAILURE, REGISTER_ADMIN_REQUEST, 
         REGISTER_ADMIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_RESIDENT_FAILURE, 
         REGISTER_RESIDENT_REQUEST, REGISTER_RESIDENT_SUCCESS, REGISTER_SUCCESS } from "./auth.actionType";

function loginUserAction(loginData) {
    return async function (dispatch) {
        dispatch({ type: LOGIN_REQUEST});
        try {
            console.log("login data",loginData.data);
            const response = await axios.post(`http://localhost:8081/auth/login`, loginData.data);
            const data = response.data;
            if (data.token) {
                localStorage.setItem("jwt", data.token);
            }
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred during login";
            dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
        }
    };
}

function registerUserAction(loginData) {
    return async function (dispatch) {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const response = await axios.post(`http://localhost:8081/auth/signup`, loginData.data);
            const data = response.data;
            console.log(data.token);
            if (data.token) {
                localStorage.setItem("jwt", data.token);
            }
            dispatch({ type: REGISTER_SUCCESS, payload: data });
        } catch (error) {
          console.log("Error response: ", error.response);
          const errorMessage = error.response?.data?.message || "An error occurred during SignUp";
            dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
        }
    };
}

function registerAdminDetails(registerDetails) {
    return async function (dispatch) {
      dispatch({ type: REGISTER_ADMIN_REQUEST});
      try {
        const response = await api.post(`http://localhost:8082/society-register`,registerDetails.data,{
          headers:{
            "Authorization":`Bearer ${registerDetails.data.jwt}`,
          }
        });
        const data = response.data;
        dispatch({ type: REGISTER_ADMIN_SUCCESS, payload: data.message });
      } catch (error) {
        dispatch({ type: REGISTER_ADMIN_FAILURE, payload: error });
      }
    };
  }
  
  function registerResidentDetails(registerDetails) {
    return async function (dispatch) {
      dispatch({ type: REGISTER_RESIDENT_REQUEST });
      console.log("Register Details:", registerDetails);
      try {
        const response = await api.post(`http://localhost:8082/resident-register`,registerDetails.data,{
          headers:{
            "Authorization":`Bearer ${registerDetails.data.jwt}`,
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        dispatch({ type: REGISTER_RESIDENT_SUCCESS, payload: data.message });
      } catch (error) {
        dispatch({ type: REGISTER_RESIDENT_FAILURE, payload: error });
      }
    };
  }

  function getUserDetails(jwtToken) {
    return async function (dispatch) {
      dispatch({ type: GET_USER_DETAILS_REQUEST });
      try {
        const response = await api.get(`http://localhost:8082/getResidentProfile`,{
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_USER_DETAILS_FAILURE, payload: error });
      }
    };
  }

  function getAdminDetails(jwtToken) {
    return async function (dispatch) {
      dispatch({ type: GET_ADMIN_DETAILS_REQUEST });
      try {
        const response = await api.get(`http://localhost:8082/get-admin`,{
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        dispatch({ type: GET_ADMIN_DETAILS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_ADMIN_DETAILS_FAILURE, payload: error });
      }
    };
  }
  
  function getUser(jwtToken) {
    return async function (dispatch) {
      dispatch({ type: GET_USER_REQUEST });
      try {
        const response = await api.get(`http://localhost:8081/get-user`,{
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          }
        });
        const data = response.data;
        dispatch({ type: GET_USER_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error });
      }
    };
  }
export { loginUserAction, registerUserAction, registerAdminDetails, registerResidentDetails,getUserDetails,getUser,getAdminDetails };
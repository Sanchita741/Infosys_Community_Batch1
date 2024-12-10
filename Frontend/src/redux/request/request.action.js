import axios from "axios";
import { ADD_VENDOR_FAILURE, ADD_VENDOR_REQUEST, ADD_VENDOR_SUCCESS, REQUEST_SERVICE_FAILURE, REQUEST_SERVICE_REQUEST, REQUEST_SERVICE_SUCCESS } from "./request.actionType"
function addVendor(vendorData){
    return async function(dispatch){
        dispatch({type:ADD_VENDOR_REQUEST})
        try{
            const jwtToken = localStorage.getItem("jwt");
            const response = await axios.post(`http://localhost:8083/addVendor`, vendorData.data,{
                headers: {
                    "Authorization": `Bearer ${jwtToken}`,
                    "Content-Type": "application/json"
                  }
            });
            dispatch({ type: ADD_VENDOR_SUCCESS, payload: "Added Vendor Successfully" });
        }
        catch(error){
            const errorMessage = error.response?.data?.message || "unable to add vendor";
            dispatch({ type: ADD_VENDOR_FAILURE, payload: errorMessage });
        }
    }
}

function requestService(requestData){
    return async function(dispatch){
        dispatch({type:REQUEST_SERVICE_REQUEST})
        console.log("requestService error",requestData.data)
        if (requestData.data.vendorId==null) {
            const errorMessage = "Select A Valid Vendor...";
            dispatch({ type: REQUEST_SERVICE_FAILURE, payload: errorMessage });
            return;
        }
        try{
            const response = await axios.post(`http://localhost:8083/sendRequest`, requestData.data);
            dispatch({ type: REQUEST_SERVICE_SUCCESS, payload: "Request Sent Successfully" });
        }
        catch(error){
            dispatch({ type: REQUEST_SERVICE_FAILURE, payload: "Unable To Send Request"});
        }
    }
}

export {addVendor,requestService}
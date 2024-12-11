import axios from "axios"

export const createNewUser = async (data) =>{
    const response = await axios.post("http://localhost:3000/addUser",data);
    return response;
}

export const checkUserLogin = async (data) =>{
    const response = await axios.post("http://localhost:3000/checkUserLogin ",data);
    return response;    
}

export const updateUserData = async (token,data) =>{
    const response = await axios.put("http://localhost:3000/updateUserData",data,{
        headers :{
            "Authorization" : token,
            "Content-Type" : "multipart/form-data"
        }
    });
    return response;
}
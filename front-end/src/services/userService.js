import axios from "axios"

export const createNewUser = async (data) =>{
    const response = await axios.post("http://localhost:3000/addUser",data);
    return response;
}

export const checkUserLogin = async (data) =>{
    const response = await axios.post("http://localhost:3000/checkUserLogin",data);
    return response;
}
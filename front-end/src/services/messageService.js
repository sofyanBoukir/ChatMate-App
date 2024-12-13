import axios from "axios"

export const getMessages = async (senderId,receiverId) =>{
    const response = await axios.get(`http://localhost:3000/getMessages?senderId=${senderId}&receiverId=${receiverId}`);
    return response;
}

export const sendNewMessage = async (senderId,receiverId,message) =>{
    const response = await axios.post(`http://localhost:3000/sendNewMessage?senderId=${senderId}&receiverId=${receiverId}&message=${message}`)
    return response;
}
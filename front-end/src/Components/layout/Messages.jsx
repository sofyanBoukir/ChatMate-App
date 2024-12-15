import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Input } from "../UI/Input"
import { Outgoing } from "../Messages/Outgoing"
import { Incoming } from "../Messages/Incoming"
import { useEffect, useRef, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { Notification } from "../UI/Notification"
import { sendNewMessage } from "../../services/messageService"
import userDefaultImage from "../../../public/userDefaultImage.jpg"


export const Messages = ({loading,messages,appendMessage,userToChat}) => {

    const containerRef = useRef(null);
    const userData = useSelector(userData => userData);
    const [message,setMessage] = useState('');
    const [error,setError] = useState(false);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };
    
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
      
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year} at ${hours}:${minutes}`;
    };

    const sendMessage = async () =>{
        if(message === ''){
            setError(true)
            return;
        }
        const response = await sendNewMessage(userData._id,userToChat._id,message);   
        setMessage('');
        if (response && response.data.sent) {
            const newMessage = {
                sender_id: userData._id,
                message: message,
                createdAt: new Date().toISOString(),
            };
            appendMessage(newMessage)
            setMessage('');
            setError(false);
            scrollToBottom();
        }
    }
    const userProfilePicture = userToChat.profilePicture ? userToChat.profilePicture.data.data : null

    if(userProfilePicture !== null){
        const base64String = btoa(String.fromCharCode(...new Uint8Array(userProfilePicture)));
        var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
    }

    console.log(userToChat);
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
  return (
    <div>
        {
            loading ? 
                <div className="flex justify-center mt-5">
                    <CircularProgress size={"30px"}/>
                </div>
            :
                <>
                <div className="flex flex-row gap-2 items-center mb-2 rounded-md px-2 py-1 bg-gray-900">
                    <div>
                        <img className="rounded-full h-10 w-10" src={userProfilePhoto ? userProfilePhoto : userDefaultImage}/>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">{userToChat.fullName}</p>
                        <p className="text-sm text-gray-500">{userToChat.status === 'online'?userToChat.status : "last seen on "+formatDateTime(userToChat.lastSeen)}</p>
                    </div>
                </div>
                    <div className="flex flex-col gap-2 bg-gray-950 overflow-auto p-2 h-96 scrollbar-hide" ref={containerRef}>
                        {
                            messages && messages.length ?
                                messages.map((message) =>{
                                    if(message.sender_id === userData._id){
                                        return <Outgoing text={message.message} sendAt={message.createdAt}/>
                                    }
                                    return <Incoming text={message.message} sendAt={message.createdAt} profilePhoto={userToChat.profilePicture}/>
                                })
                            :<div className="flex flex-col text-center justify-center mt-20">
                                <ChatBubbleLeftEllipsisIcon className="w-20 h-20 mx-auto"/>
                                <span className="text-xl font-semibold">Start new Conversation with this user</span>
                            </div>
                        }
                    </div>
                    <div className="mt-2 flex flex-row gap-2 items-center bg-gray-950">
                        <Input placeholder={"Type somthing!"} width={"90%"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <button className="bg-gray-800 px-3 py-1 rounded-sm">
                            <PaperAirplaneIcon className="text-white w-7 h-7" onClick={sendMessage}/>
                        </button>
                    </div>
                    {
                        error && <Notification message={"Write somthing!"} kind={'error'}/>
                    }
                </>
        }
    </div>
  )
}

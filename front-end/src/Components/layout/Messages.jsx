import { ChatBubbleLeftEllipsisIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Input } from "../UI/Input"
import { Outgoing } from "../Messages/Outgoing"
import { Incoming } from "../Messages/Incoming"
import { useEffect, useRef, useState } from "react"
import { CircularProgress } from "@mui/material"
import { useSelector } from "react-redux"
import { Notification } from "../UI/Notification"
import { sendNewMessage } from "../../services/messageService"

export const Messages = ({loading,messagesData,userToChat}) => {

    const containerRef = useRef(null);
    const userData = useSelector(userData => userData);
    const [message,setMessage] = useState('');
    const [error,setError] = useState(false);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };    

    const sendMessage = async () =>{
        if(message === ''){
            setError(true)
            return;
        }
        const response = await sendNewMessage(userData._id,userToChat._id,message);   
        setMessage('')     
    }

    useEffect(() => {
        scrollToBottom();
    }, []);
  return (
    <div>
        {
            loading ? 
                <div className="flex justify-center items-center">
                    <CircularProgress size={"20px"}/>
                </div>
            :
                <div ref={containerRef}>
                    <div className="flex flex-col gap-2 overflow-auto p-2 h-96 scrollbar-hide">
                        {
                            messagesData && messagesData.length ?
                                messagesData.map((message) =>{
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
                    <div className="mt-2 flex flex-row gap-2 items-center">
                        <Input placeholder={"Type somthing!"} width={"90%"} value={message} onChange={(e) => setMessage(e.target.value)}/>
                        <button className="bg-gray-100 px-3 py-1 rounded-sm">
                            <PaperAirplaneIcon className="text-black w-7 h-7" onClick={sendMessage}/>
                        </button>
                    </div>
                    {
                        error && <Notification message={"Write somthing!"} kind={'error'}/>
                    }
                </div>
        }
    </div>
  )
}

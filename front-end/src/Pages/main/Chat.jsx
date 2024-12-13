import { useSelector } from "react-redux"
import { Header } from "../../Components/layout/Header"
import userDefaultImage from "../../../public/userDefaultImage.jpg"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { UsersIcon } from "@heroicons/react/24/outline"
import { UserInfo } from "../../Components/User/UserInfo"
import { DefaultRightChat } from "../../Components/layout/DefaultRightChat"
import { useEffect, useRef, useState } from "react"
import { Messages } from "../../Components/layout/Messages"
import { searchUsersByUsername } from "../../services/userService"
import { LinearProgress } from "@mui/material"
import io from "socket.io-client"
import { getMessages } from "../../services/messageService"

const socket = io("http://localhost:3000")

export const Chat = () => {

  const userData = useSelector(userData => userData)
  const imageData = userData.profilePicture ? userData.profilePicture.data.data : null
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [mounted,setMounted] = useState(false);
  const [userToChat,setUserToChat] = useState();
  const [messagesLoading,setMessagesLoading] = useState(false);
  const [messages,setMessages] = useState([]);

  
  if(imageData !== null){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
  }

  useEffect(() =>{  
    socket.emit("userConnected",userData._id);
    setMounted(true);
    
    if(mounted){
      return () => socket.disconnect();
    }
  },[mounted])

  const searchUsers = async () =>{
    setLoading(true);
    const response = await searchUsersByUsername(username,localStorage.getItem("token"));
    setLoading(false);    
    
    if(response.data.founded){
      setUsers(response.data.users)
    }
  }


  const showMessages = async (userToChatData) =>{
    setUserToChat(userToChatData);
    setMessages([]);
    setMessagesLoading(true);
    const response = await getMessages(userData._id,userToChatData._id);
    
    setMessagesLoading(false);
    if(response.data.messages){
      setMessages(response.data.messages);
    }
    setOpen(true);
  }

  useEffect(() =>{
    if(username !== ''){
      searchUsers();
    }
  },[username]);


  return (  
    <div>
      <Header />
      <div className="px-2 md:px-16 mt-10">
        <div className="bg-gray-100 w-[90%] mx-auto rounded-md px-3 py-6 flex justify-between">
          <div className="w-[20%] md:w-[30%]">
            <div className="flex flex-row items-end">
              <UsersIcon className="w-8 h-8"/>
              <span className="text-md font-semibold">Contacts</span>
            </div>
            <div className="mt-5 hidden md:block">
              <Label text={"Search for someone!"} />
              <Input width={"100%"} placeholder={"username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="mt-2">
              <div className="flex flex-col gap-2 h-80 overflow-auto">
                {
                  users && users.length ? 
                    users.map((user) => {
                      return <>
                        <UserInfo status={user.status} username={user.username} profilePhoto={user.profilePicture} id={user._id} onClick={() => showMessages(user)}/>
                      </>
                    })
                  : null
                }
                {
                  loading && <LinearProgress />
                }
              </div>
            </div>
          </div>
            {
              open ?
                <div className="w-[75%] md:w-[65%] rounded-sm border bg-gray-200">
                  <Messages loading={messagesLoading} messagesData={messages} userToChat={userToChat}/>
                </div>
                :
                <div className="w-[75%] md:w-[65%] flex justify-center items-center text-center rounded-sm border bg-gray-200">
                  <DefaultRightChat />
                </div>
            }
        </div>
      </div>
    </div>
  )
}

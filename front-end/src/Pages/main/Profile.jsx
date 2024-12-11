import { useDispatch, useSelector } from "react-redux"
import { Header } from "../../Components/layout/Header"
import userDefaultImage from "../../../public/userDefaultImage.jpg"
import { CloudArrowUpIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline"
import { Label } from "../../Components/UI/Label"
import { Input } from "../../Components/UI/Input"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"
import { updateUserData } from "../../services/userService"
import { Notification } from "../../Components/UI/Notification"

export const Profile = () => {
  const userData = useSelector(userData => userData);
  const date = new Date(userData.createdAt);
  const userJoinedAt = date.toLocaleDateString().replace(/\//g, '-');

  const [profilePhoto,setProfilePhoto] = useState(null);
  const [formData,setFormData] = useState({
    fullName : userData.fullName,
    username : userData.username,
  })
  const [loading,setLoading] = useState(false);
  const [updated,setUpdated] = useState(false);
  const [message,setMessage] = useState('');  
  const dispatch = useDispatch();

  const handleProfilePhotoChange = (e) =>{
    setProfilePhoto(e.target.files[0])
  }
  
  const imageData = userData.profilePicture ? userData.profilePicture.data.data : null

  if(imageData !== null){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name] : value,
    }));
  }
  
  const handleSubmit = async (e) =>{
    setUpdated(false);
    setMessage('');
    e.preventDefault(); 


    const personalInfoData = new FormData();
    personalInfoData.append("username",formData.username);
    personalInfoData.append("fullName",formData.fullName);
    if(profilePhoto !== null){
        personalInfoData.append("profilePicture", profilePhoto);
    }
    setLoading(true);
    const response = await updateUserData(localStorage.getItem("token"),personalInfoData);        
    setLoading(false);

    if(response.data.updated){
        setUpdated(true);
        dispatch({type:"UPDATE_USER_DATA",userData:response.data.user});
        return;
    }
    if(response.data.usernameAlreadyExist){
        setMessage("Usrname already exist");
        return;
    }
    setMessage("An error occured");
  }

  return (
    <div>
        <Header />
        <div className="px-16 mt-4 w-[90%] lg:w-[40%] mx-auto bg-gray-100 rounded-lg py-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <span className="font-semibold">Your profile information</span>
                <img src={userData.profilePicture ? userProfilePhoto : userDefaultImage} 
                className="h-20 w-20 rounded-full border-2 border-blue-500 mt-5"/>
                <input type="file" id="uploadImage" className="hidden" onChange={handleProfilePhotoChange}/>
                <label htmlFor="uploadImage" className="text-xs mt-3 flex flex-row gap-1 items-center bg-blue-500 text-white rounded-sm px-3 py-1 cursor-pointer">
                    <CloudArrowUpIcon className="w-4 h-4"/>Upload image
                </label>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-4 flex flex-col gap-4">
                    <div>
                        <div className="flex flex-row gap-1 items-center mb-2">
                            <UserIcon className="w-5 h-5"/><Label text={"Full name"}/>
                        </div>
                        <Input type={"text"} value={formData.fullName} onChange={handleChange} name={"fullName"} />
                    </div>
                    <div>
                        <div className="flex flex-row gap-1 items-center mb-2">
                            <PencilSquareIcon className="w-5 h-5"/><Label text={"Username"}/>
                        </div>
                        <Input type={"text"} value={formData.username} onChange={handleChange} name={"username"} />
                    </div>
                    <div className="px-5 mt-5">
                        <h1 className="text-lg font-semibold">Account information</h1>
                        <div className="mt-3">
                            <div className="flex justify-between">
                                <span>Member since</span>
                                <span className="font-semibold">{userJoinedAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Account status</span>
                                <span className="font-semibold">Online</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button text={"Save info"} type={"submit"} loading={loading}/>
                    </div>
                </div>
            </form>
            {
                updated && <Notification kind={"success"} message={"Data updaetd Successfully!"} />
            }
            {
                message && <Notification kind={"error"} message={message} />
            }
        </div>
    </div>
  )
}

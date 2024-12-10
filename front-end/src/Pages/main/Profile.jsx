import { useSelector } from "react-redux"
import { Header } from "../../Components/layout/Header"
import userDefaultImage from "../../../public/userDefaultImage.jpg"
import { CloudArrowUpIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline"
import { Label } from "../../Components/UI/Label"
import { Input } from "../../Components/UI/Input"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"
import { updateUserData } from "../../services/userService"

export const Profile = () => {

  const userData = useSelector(userData => userData)

  const [profilePhoto,setProfilePhoto] = useState(null);
  const [formData,setFormData] = useState({
    fullName : userData.fullName,
    username : userData.username,
  })
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');  

  const handleProfilePhotoChange = (e) =>{
    setProfilePhoto(e.target.files[0])
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name] : value,
    }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault(); 
    const data = new FormData();
    data.append("username",formData.username);
    data.append("fullName",formData.fullName);
    if(profilePhoto !== null){
        data.append("profilePicture",profilePhoto);
    }
    setLoading(true);
    const response = await updateUserData(localStorage.getItem("token"),formData);
    setLoading(false);
  }

  return (
    <div className="text-white">
        <Header />
        <div className="px-16 mt-4 w-[90%] lg:w-[40%] mx-auto bg-gray-900 rounded-lg py-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold">Profile</h1>
                <span className="font-semibold">Your profile information</span>
                <img src={userData.profilePicture ? userData.profilePicture : userDefaultImage} 
                className="h-20 w-20 rounded-full border-2 border-blue-500 mt-5"/>
                <input type="file" id="uploadImage" className="hidden" onChange={handleProfilePhotoChange}/>
                <label htmlFor="uploadImage" className="text-xs mt-3 flex flex-row gap-1 items-center bg-blue-500 rounded-sm px-3 py-1 cursor-pointer">
                    <CloudArrowUpIcon className="w-4 h-4"/>    Upload image
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
                                <span className="font-semibold">12-12-2024</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Account status</span>
                                <span className="font-semibold">Online</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button text={"Save info"} type={"submit"}/>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

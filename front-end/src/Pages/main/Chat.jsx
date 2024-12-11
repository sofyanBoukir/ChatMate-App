import { useSelector } from "react-redux"
import { Header } from "../../Components/layout/Header"
import userDefaultImage from "../../../public/userDefaultImage.jpg"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { UsersIcon } from "@heroicons/react/24/outline"
import { UserInfo } from "../../Components/User/UserInfo"
import { DefaultRightChat } from "../../Components/layout/DefaultRightChat"
import { useState } from "react"
import { Messages } from "../../Components/layout/Messages"

export const Chat = () => {

  const userData = useSelector(userData => userData)
  const imageData = userData.profilePicture ? userData.profilePicture.data.data : null
  const [open,setOpen] = useState(false);

  if(imageData !== null){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
    var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
  }

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
              <Input width={"100%"} placeholder={"username"}/>
            </div>
            <div className="mt-2">
              <div className="flex flex-col gap-2 h-80 overflow-auto">
                <UserInfo userFullName={"Soufian"} username={"soso"} profilePhoto={userDefaultImage} onClick={() => setOpen(true)}/>
                <UserInfo userFullName={"Soufian"} username={"soso"} profilePhoto={userDefaultImage} />
                <UserInfo userFullName={"Soufian"} username={"soso"} profilePhoto={userDefaultImage} />
                <UserInfo userFullName={"Soufian"} username={"soso"} profilePhoto={userDefaultImage} />
                <UserInfo userFullName={"Soufian"} username={"soso"} profilePhoto={userDefaultImage} />
              </div>
            </div>
          </div>
            {
              open ?
                <div className="w-[75%] md:w-[65%] rounded-sm border bg-gray-200">
                  <Messages />
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

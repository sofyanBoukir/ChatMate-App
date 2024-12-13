import userDefaultImage from "../../../public/userDefaultImage.jpg"

export const UserInfo = ({status,username,profilePhoto,id,onClick}) => {
    const imageData = profilePhoto ? profilePhoto.data.data : null

    if(imageData !== null){
        const base64String = btoa(String.fromCharCode(...new Uint8Array(imageData)));
        var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
    }
  return (
        <div className="w-[100%] px-3 py-1 flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-200 duration-200" onClick={onClick}>
            <div>
                <img src={userProfilePhoto ? userProfilePhoto : userDefaultImage} className="rounded-full h-10 w-10 border-2 border-blue-500"/>
            </div>
            <div>
                <p className="font-semibold hidden lg:block">{username}</p>
                <p className="text-sm text-gray-400 hidden lg:block">{status}</p>
            </div>
        </div>
  )
}
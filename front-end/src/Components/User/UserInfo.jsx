export const UserInfo = ({userFullName,username,profilePhoto,onClick}) => {
  return (
        <div className="w-[100%] px-3 py-1 flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-200 duration-200" onClick={onClick}>
            <div>
                <img src={profilePhoto} className="rounded-full h-10 w-10 border-2 border-blue-500"/>
            </div>
            <div>
                <p className="font-semibold hidden lg:block">{userFullName}</p>
                <p className="text-sm text-gray-400 hidden lg:block">{username}</p>
            </div>
        </div>
  )
}

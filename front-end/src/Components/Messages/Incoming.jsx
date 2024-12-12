import userDefaultImage from "../../../public/userDefaultImage.jpg"

export const Incoming = ({text}) => {
    return (
        <div className="flex justify-start items-start gap-1">
            <img src={userDefaultImage} className="rounded-full h-6 w-6"/>
            <div className="text-white bg-blue-600 rounded-xl rounded-tl-sm px-2 py-1 text-start max-w-[80%]">
                {text}
                <br></br>
                <span className="text-gray-200 text-xs float-right">11:13 PM</span>
            </div>
        </div>
    )
      
}

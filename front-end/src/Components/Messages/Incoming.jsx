import userDefaultImage from "../../../public/userDefaultImage.jpg"

export const Incoming = ({text,sendAt,profilePhoto}) => {
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
      
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `${day}-${month}-${year} ${hours}:${minutes}`;
      };


      const userProfilePicture = profilePhoto ? profilePhoto.data.data : null

        if(userProfilePicture !== null){
            const base64String = btoa(String.fromCharCode(...new Uint8Array(userProfilePicture)));
            var userProfilePhoto = `data:image/jpeg;base64,${base64String}`;
        }
    return (
        <div className="flex justify-start items-start gap-1">
            <img src={userProfilePhoto ? userProfilePhoto : userDefaultImage} className="rounded-full h-6 w-6"/>
            <div className="text-white bg-blue-600 rounded-xl rounded-tl-sm px-2 py-1 text-start max-w-[80%]">
                {text}
                <br></br>
                <span className="text-gray-200 text-xs float-right">{formatDateTime(sendAt)}</span>
            </div>
        </div>
    )
      
}

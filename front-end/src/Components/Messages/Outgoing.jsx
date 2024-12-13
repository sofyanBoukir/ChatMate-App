
export const Outgoing = ({text,sendAt}) => {

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
  
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <div className="flex justify-end">
        <div className="text-black bg-gray-100 rounded-xl rounded-br-sm px-2 py-1 max-w-[80%]">
            {text}
            <br></br>
            <span className="text-gray-500 text-xs float-right">{formatDateTime(sendAt)}</span>
        </div>
    </div>
  )
}

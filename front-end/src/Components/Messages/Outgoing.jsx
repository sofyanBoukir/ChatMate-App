
export const Outgoing = ({text,time}) => {
  return (
    <div className="flex justify-end">
        <div className="text-black bg-gray-100 rounded-xl rounded-br-sm px-2 py-1 max-w-[80%]">
            {text}
            <br></br>
            <span className="text-gray-500 text-xs float-right">11:13 PM</span>
        </div>
    </div>
  )
}

import { Input } from "../UI/Input"

export const Messages = () => {
  return (
    <div>
        <div className="flex flex-col gap-2">
            <div className="text-white bg-blue-500 rounded-sm px-3 py-1">
                <span>This is the message</span>
            </div>
            <div className="text-white bg-blue-500 rounded-sm px-3 py-1">
                <span>This is the message</span>
            </div>
            <div className="text-white bg-blue-500 rounded-sm px-3 py-1">
                <span>This is the message</span>
            </div>
            <div className="text-white bg-blue-500 rounded-sm px-3 py-1">
                <span>This is the message</span>
            </div>
            <div className="text-white bg-blue-500 rounded-sm px-3 py-1">
                <span>This is the message</span>
            </div>
        </div>
        <div>
            <Input placeholder={"Type somthing!"} />
        </div>
    </div>
  )
}

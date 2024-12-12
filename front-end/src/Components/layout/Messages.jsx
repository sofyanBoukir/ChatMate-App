import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { Input } from "../UI/Input"
import { Outgoing } from "../Messages/Outgoing"
import { Incoming } from "../Messages/Incoming"
import { useEffect, useRef } from "react"

export const Messages = () => {
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);
  return (
    <div>
        <div className="flex flex-col gap-2 overflow-auto p-2 h-96 scrollbar-hide" ref={containerRef}>
            <Outgoing text={"this is the message"}/>
            <Outgoing text={"this is the message this is the message this is the message this is the message"}/>
            <Outgoing text={"this is the message this is the message"}/>
            <Incoming text={"this is the message this is the message"}/>
            <Outgoing text={"this is the message"}/>
            <Incoming text={"this is the message this is the messagethis is the messagethe messagethis is the messagethe messagethis is the messagethe messagethis is the message"}/>
            <Outgoing text={"this is the message this is the message"}/>
            <Incoming text={"this is the message this is the message this is the message"}/>
            <Outgoing text={"this is the message this is the message this is the messagethis is the messagethis is the messagethis is the messagethis is the messagethis is the message"}/>
            <Outgoing text={"this is the message this is the message"}/>
        </div>
        <div className="mt-2 flex flex-row gap-2 items-center">
            <Input placeholder={"Type somthing!"} width={"90%"}/>
            <button className="bg-gray-100 px-3 py-1 rounded-sm">
                <PaperAirplaneIcon className="text-black w-7 h-7" />
            </button>
        </div>
    </div>
  )
}

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"

export const DefaultRightChat = () => {
  return (
    <div className="text-center">
        <ChatBubbleLeftRightIcon className="w-40 h-32 flex"/>
        <span className="font-semibold">Try to message someOne...</span>
    </div>
  )
}

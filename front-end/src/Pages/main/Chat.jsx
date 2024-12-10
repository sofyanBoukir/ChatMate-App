import { useSelector } from "react-redux"
import { Header } from "../../Components/layout/Header"

export const Chat = () => {

  const userData = useSelector(userData => userData)
  
  return (
    <div className="text-white">
      <Header />
      <div className="px-16 mt-10">
        <h1>Welcome {userData.fullName}</h1>
      </div>
    </div>
  )
}

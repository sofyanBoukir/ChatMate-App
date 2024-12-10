import { Route, Routes } from "react-router-dom"
import { Login } from "./Pages/auth/Login"
import { Register } from "./Pages/auth/Register"
import { Chat } from "./Pages/main/Chat"
import { Profile } from "./Pages/main/Profile"

export const App = () => {
  return <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
}

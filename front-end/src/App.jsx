import { Route, Routes } from "react-router-dom"
import { Login } from "./Pages/auth/Login"
import { Register } from "./Pages/auth/Register"
import { Chat } from "./Pages/main/Chat"
import { Profile } from "./Pages/main/Profile"
import { UserAuth } from "./ProtectedRoutes/UserAuth"

export const App = () => {
  return <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<UserAuth />}>
        <Route path="/main" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
}

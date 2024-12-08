import { Route, Routes } from "react-router-dom"
import { Login } from "./Pages/auth/Login"
import { Register } from "./Pages/auth/Register"

export const App = () => {
  return <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
}

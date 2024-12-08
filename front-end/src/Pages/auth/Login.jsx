import { Link } from "react-router-dom"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"

export const Login = () => {

  const [formData,setFormData] = useState({
    username : '',
    password : '',
  })

  const handleChangeData = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) =>({
      ...prevState,
      [name]:value,
    }));
  }


  return (
    <div className="w-[40%] rounded-md mx-auto px-5 py-8 mt-20 bg-gray-100 shadow-lg">
      <div>
        <h1 className="text-2xl font-semibold">Login page</h1>
        <span>Don't have an account? <Link to={"/register"} className="text-blue-700 underline">Sign up</Link></span>
      </div>
      <div className="mt-5">
        <form>
          <div className="flex flex-col gap-4">
            <div>
              <Label text={"Username"} />
              <Input type={"text"} placeholder={"ex: so01"} name={"username"} value={formData.username} onChange={handleChangeData}/>
            </div>
            <div>
              <Label text={"Password"} />
              <Input type={"password"} placeholder={"●●●●●●●●"} name={"password"} value={formData.password} onChange={handleChangeData}/>
            </div>
            <div>
              <Button text={"Sign in"} type={"submit"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

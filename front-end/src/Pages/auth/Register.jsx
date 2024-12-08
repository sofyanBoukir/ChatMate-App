import { Link } from "react-router-dom"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"

export const Register = () => {

  const [formData,setFormData] = useState({
    fullName : '',
    username : '',
    password : '',
    r_password : '',
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
        <span>Already have an account? <Link to={"/"} className="text-blue-700 underline">Sign in</Link></span>
      </div>
      <div className="mt-5">
        <form>
          <div className="flex flex-col gap-4">
            <div>
              <Label text={"Full name"} />
              <Input type={"text"} placeholder={"ex: Jhon bo"} name={"fullName"} value={formData.fullName} onChange={handleChangeData}/>
            </div>
            <div>
              <Label text={"Username"} />
              <Input type={"text"} placeholder={"ex: so01"} name={"username"} value={formData.username} onChange={handleChangeData}/>
            </div>
            <div>
              <Label text={"Password"} />
              <Input type={"password"} placeholder={"●●●●●●●●"} name={"password"} value={formData.password} onChange={handleChangeData}/>
            </div>
            <div>
              <Label text={"Confirm Password"} />
              <Input type={"password"} placeholder={"●●●●●●●●"} name={"r_password"} value={formData.r_password} onChange={handleChangeData}/>
            </div>
            <div>
              <Button text={"Sign Up"} type={"submit"} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"
import { createNewUser } from "../../services/userService"
import { LinearProgress } from "@mui/material"

export const Register = () => {

  const [formData,setFormData] = useState({
    fullName : '',
    username : '',
    password : '',
    r_password : '',
  })

  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');
  const [userCreated,setUserCreated] = useState(false);
  const navigate = useNavigate();

  const handleChangeData = (e) =>{
    const {name,value} = e.target;
    setFormData((prevState) =>({
      ...prevState,
      [name]:value,
    }));
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const response = await createNewUser(formData);
    setLoading(false);
    if(response.data.created){
      setUserCreated(true)
      setMessage('')
      setTimeout(() => {
        navigate("/")
      }, 3000);
      return
    }
    response.data.message ? setMessage(response.data.message) : setMessage("An error occured!");
  }

  return (
    <div className="w-[90%] md:w-[40%] rounded-md mx-auto px-5 py-8 mt-20 bg-gray-900 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Login page</h1>
        <span>Already have an account? <Link to={"/"} className="text-blue-700 underline">Sign in</Link></span>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
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
              {message && <span className="text-red-500">{message}</span>}
            </div>
            <div>
              {
                userCreated ? 
                  <>
                    <span className="flex justify-center">User created successfully, Redirecting to login...</span>
                    <LinearProgress />
                  </>
                :null 
              }
            </div>
            <div>
              <Button text={"Sign Up"} type={"submit"} loading={loading}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

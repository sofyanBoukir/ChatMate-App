import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../Components/UI/Input"
import { Label } from "../../Components/UI/Label"
import { Button } from "../../Components/UI/Button"
import { useState } from "react"
import { checkUserLogin } from "../../services/userService"
import { useDispatch } from "react-redux"

export const Login = () => {

  const [formData,setFormData] = useState({
    username : '',
    password : '',
  })

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');
  const dispatch = useDispatch();

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
    const response = await checkUserLogin(formData);
    setLoading(false);
    
    if(response.data.isLoggedIn){
      localStorage.setItem("token",response.data.token);
      dispatch({type:"SET_USER_DATA",userData:response.data.user});
      navigate("/main");
      return
    }
    response.data.message ? setMessage(response.data.message) : setMessage("An error occured!");
  }

  return (
    <div className="w-[90%] md:w-[40%] rounded-md mx-auto px-5 py-8 mt-20 bg-gray-950 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Login page</h1>
        <span>Don't have an account? <Link to={"/register"} className="text-blue-700 underline">Sign up</Link></span>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <Label text={"Username"} />
              <Input type={"text"} placeholder={"ex: so01"} name={"username"} value={formData.username} onChange={handleChangeData}/>
            </div>
            <div>
              <Label text={"Password"} />
              <Input type={"password"} placeholder={"●●●●●●●●"} name={"password"} value={formData.password} onChange={handleChangeData}/>
              {message && <span className="text-red-500">{message}</span>}
            </div>
            <div>
              <Button text={"Sign in"} type={"submit"} loading={loading}/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

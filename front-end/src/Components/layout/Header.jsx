import { ArrowRightStartOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();

    const loggingOut = async () =>{
        localStorage.clear();
        navigate("/")
    }

  return (
    <div className='w-[100%]'>
        <div className='flex justify-between w-[100%] px-16 py-4 text-white'>
            <div className='flex flex-row gap-2 items-center'>
                <h1 className='text-lg font-semibold cursor-pointer' onClick={() => navigate("/main")}>ChatMate</h1>
            </div>
            <div className='flex flex-row gap-4 items-center'>
                <div className='flex flex-row gap-1 cursor-pointer hover:bg-gray-900 rounded-md px-2 py-1 duration-300' onClick={() => navigate("/profile")}>
                    <UserIcon className='w-6 h-6'/>
                    <span className='font-semibold hidden md:block'>Profile</span>
                </div>
                <div className='flex flex-row gap-1 cursor-pointer hover:bg-gray-900 rounded-md px-2 py-1 duration-300' onClick={() => loggingOut()}>
                    <ArrowRightStartOnRectangleIcon className='w-6 h-6'/>
                    <span className='font-semibold hidden md:block'>Logout</span>
                </div>
            </div>
        </div>
    </div>
)
}

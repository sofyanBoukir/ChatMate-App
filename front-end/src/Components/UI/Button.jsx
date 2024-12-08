import { CircularProgress } from "@mui/material"

export const Button = ({text,type,bg,loading,width,onClick}) => {
  return (
        <button type={type}
                disabled={loading}
                onClick={onClick}
                className={`${width? `w-${width}`:'w-[100%]'} ${bg? `${bg}`:'bg-blue-700'} text-white py-1 rounded-sm cursor-pointer ${loading? 'cursor-no-drop':null}`}>
                    {
                        loading ? 
                            <CircularProgress size={"21px"} color="white"/>
                        : text
                    }
        </button>
    )
}

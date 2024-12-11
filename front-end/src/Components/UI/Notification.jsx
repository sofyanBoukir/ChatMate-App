import { Alert, Snackbar } from "@mui/material"
import { useState } from "react";

export const Notification = ({message,kind}) => {
    const [open,setOpen] = useState(true);
    setTimeout(() => {
        setOpen(false)
    }, 3000);
  return (
    <div>
        <Snackbar open={open}>
            <Alert
                severity={kind}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    </div>
  )
}

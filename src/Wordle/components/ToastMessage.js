import React from "react"
import Snackbar from "@mui/material/Snackbar"
import { ToastContent } from "../styles"

const ToastMessage = ({ alert, handleClose }) => {
  return (
    <Snackbar
      open={alert?.display}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <ToastContent>
        <strong>{alert?.msg}</strong>
      </ToastContent>
    </Snackbar>
  )
}

export default ToastMessage

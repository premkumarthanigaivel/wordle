import React from "react"
import Snackbar from "@mui/material/Snackbar"
import { ToastContent } from "../styles"

const ToastMessage = ({ alert, handleClose, darkMode }) => {
  return (
    <Snackbar
      open={alert?.display}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <ToastContent darkMode={darkMode}>
        <strong>{alert?.msg}</strong>
      </ToastContent>
    </Snackbar>
  )
}

export default ToastMessage

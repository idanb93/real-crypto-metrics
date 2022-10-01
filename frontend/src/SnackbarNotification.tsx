import { IconButton, Snackbar } from '@mui/material'
import { observer } from 'mobx-react'
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'
import { notificationStore } from './stores/notificationsStore'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const Notification = observer(() => {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(e) => notificationStore.hide()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      open={notificationStore.isOpen}
      onClose={(e) => notificationStore.hide()}
      action={action}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={2000}
    >
      <Alert onClose={(e) => notificationStore.hide()} sx={{ width: '100%' }}>
        {notificationStore.message}
      </Alert>
    </Snackbar>
  )
})

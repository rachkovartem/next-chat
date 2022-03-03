import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {ReactElement} from "react";
import SnackbarContent from '@mui/material/SnackbarContent';

export const SnackBar = (
  {
      text,
      setText,
      element,
      setElement
  }
    : {
      text: string | null,
      setText: Function,
      element: ReactElement | null,
      setElement: Function,
      }) => {

    return <Snackbar
      open={Boolean(text)}
      autoHideDuration={6000}
      onClose={() => {
        setText(null);
        setElement(null);
      }}
    >
      {element
        ? <SnackbarContent sx={{maxWidth: '68px'}} message={element}/>
        :  <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          sx={{ width: '100%' }}>
          {text}
        </MuiAlert>}
    </Snackbar>
}
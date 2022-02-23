import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export const SnackBar = ({text, setText} : {text: string | null, setText: Function}) => {
    return <Snackbar open={Boolean(text)} autoHideDuration={6000} onClose={() => setText(null)}>
        <MuiAlert elevation={6} variant="filled" severity="warning" sx={{ width: '100%' }}>
            {text}
        </MuiAlert>
    </Snackbar>
}
import {makeStyles} from "@material-ui/core/styles";

const userPaper = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: '5px',
  height: 50,
  backgroundColor: 'rgba(232,232,232,0)',
}

export const roomStyles = makeStyles({

  userPaper,
  userPaperSelected: {
    ...userPaper,
    backgroundColor: '#e8e8e8',
  },
});
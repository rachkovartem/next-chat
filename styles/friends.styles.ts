import {makeStyles} from "@material-ui/core/styles";

export const friendsStyles = makeStyles({
  groupChatPaper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    padding: '5px'
  },
  friendsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridTemplateAreas: `
            'groups friends inreqs'
            'groups friends inreqs'
            'recents friends outreqs'
            'recents friends outreqs'
    `,
    gap: '22px',
    margin: '22px',
  },
});
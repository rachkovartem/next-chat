import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    profile: {
        display: 'flex', flexDirection: 'column'
    },
    userProfileBox: {
        margin: '50px auto 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 250px)',
        gap: '200px',
        '& .MuiPaper-root': {
            m: 1,
            height: 50,
        }
    },
    avatarWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        marginLeft: '6px',
        width: 100,
        height: 100
    },
    username: {
        margin: '20px 0 0 0'
    },
    avatarButton: {
        marginTop: '10px'
    },
    friendsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px'
    },
    buttonsGroup: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        marginBottom: '5px'
    },
    button: {
        fontSize: '10px'
    },
    userPaper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '5px'
    },
    userPaperNoCursor: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '5px'
    }
});
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    profile: {
        display: 'flex', flexDirection: 'column'
    },
    userProfileBox: {
        margin: '50px auto 0',
        display: 'grid',
        gridTemplateColumns: '250px 400px',
        gap: '200px',
    },
    avatarWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .avatarProfile': {
            marginLeft: '6px',
            width: '100px',
            height: '100px',
        }
    },
    avatarProfile: {
        marginLeft: '6px',
        width: '100px',
        height: '100px',
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
        width: '100%',
        display: 'grid!important',
        gridTemplateColumns: 'repeat(4, 1fr)',
        marginBottom: '5px',
    },
    button: {
        fontSize: '10px!important',
    },
    userPaper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '5px',
        m: 1,
        height: 50,
    },
    userPaperNoCursor: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '5px'
    },
    groupChatPaper: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        justifyContent: 'flex-start',
        marginBottom: '10px',
        padding: '5px'
    }
});
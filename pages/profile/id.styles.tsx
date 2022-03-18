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
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateAreas: `
            'groups friends recents'
            'groups friends inreqs'
            'groups friends outreqs'
        `,
        gap: '10px',
        margin: '10px',
        maxHeight: '100vh',
        flexWrap: 'wrap',
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
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        marginTop: '5px',
        height: 50,
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '33px',
            transform: 'translateX(26px)',
            width: '200px',
            height: '20px',
            borderBottom: '1px solid black'
        },
        '&:last-child': {
            '&::after': {
                content: '',
                width: '0',
                height: '0',
                borderBottom: '0px solid black'
            },
        }
    },
    userPaperNoCursor: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '5px',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '33px',
            transform: 'translateX(26px)',
            width: '200px',
            height: '20px',
            borderBottom: '1px solid black'
        },
        '&:last-child': {
            '&::after': {
                content: '',
                width: '0',
                height: '0',
                borderBottom: '0px solid black'
            },
        }
    },
    groupChatPaper: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        justifyContent: 'flex-start',
        marginBottom: '10px',
        padding: '5px'
    },
});
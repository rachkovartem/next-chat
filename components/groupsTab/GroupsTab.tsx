import Paper from "@mui/material/Paper";
import {Avatar, AvatarGroup} from "@mui/material";
import * as React from "react";
import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {EllipseText} from "../ellipseText/EllipseText";
import {ArrowTooltips} from "../tooltip/Tooltip";
import {profileStyles} from "../../styles/profile.styles";
import {url} from "../../helpers/constants";
import {Style} from "@mui/icons-material";
import {StyledAvatar} from "../styledAvatar/StyledAvatar";

export const GroupsTab = ({ onClickRoom }: { onClickRoom: Function }) => {
  const isBrowser = typeof window !== 'undefined';
  const classes = profileStyles();
  const { user } = useSelector((state: InitialState)  => state);
  const { fullGroupRooms } = user;

  return <div>
    {isBrowser ? fullGroupRooms
      .map((room) => {
        const text = room.fullParticipants
          .sort((a, b) => (a.id === user.id ? 0 : 1))
          .map(user => user.username)
          .join(', ')
        return (<ArrowTooltips
          key={room.roomId}
          text={text}
          placement={'left'}
          element={
          (<Paper
            className={classes.userPaper}
            key={room.roomId}
            onClick={() => onClickRoom(room.roomId)}
            elevation={0}
          >
            <AvatarGroup max={3} spacing={'small'} total={room.fullParticipants.length}>
              {room.fullParticipants
                .sort((a, b) => (a.id === user.id ? 0 : 1))
                .map(user => {
                  return (
                    <StyledAvatar key={user.id} display={'flex'} username={user.username} imagePath={user.imagePath} sx={{marginLeft: '6px'}}/>
                  )
                })}
            </AvatarGroup>
            <div style={{
              paddingRight: '5px',
              maxHeight: '100%',
              marginLeft: '12px',
              overflow: 'hidden',
              fontSize: '12px'
            }}
            >
              <EllipseText text={text} maxLine={2}/>
            </div>
          </Paper>)
        }/>)
      }) : null
    }
  </div>
}
import {FriendsListItem} from "./friendsListItem/FriendsListItem";
import * as React from "react";
import {User} from "../../profile/[id]";


export const FriendsTab = (
  {
    isBrowser,
    objFriends,
    ...props
  }:{
      isBrowser: boolean,
      objFriends: User[],
      id: string,
      groupChatMembers: { username: string, id: string }[],
      setGroupChatMembers: Function,
      enqueueSnackbar: Function
    }) => {

  return <div style={{ width: '100%' }}>
    {
      isBrowser ? objFriends
        .filter((user) => user.id !== props.id)
        .map((user) => (
          <FriendsListItem key={user.id} user={user} {...props}/>
        )) : null
    }
  </div>
}
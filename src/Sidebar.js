import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar,IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar({ state, onStateChange }) {
    const [rooms, setRooms] =useState([]);
    const [{user}, dispatch] = useStateValue();
    
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    
        return () => {
          unsubscribe();
        };
      }, []);

    return (
    <div className={state? 'sidebar' : 'sidebar__active' }>
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <h2>{user.displayName}</h2>
                {/* <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div> */}
            </div>

            {/* <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div> */}

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} state={state} onStateChange={onStateChange}/>
                    // <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
                
                {/* <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/> */}
            </div> 
    </div>
    );
}

export default Sidebar;
import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReorderIcon from '@mui/icons-material/Reorder';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';

function Chat({ state, onStateChange }) {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const chatBodyRef = useRef(null);

    useEffect(()=>{
        if(roomId){
            db.collection("rooms")
              .doc(roomId)
              .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
              .doc(roomId)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
              );
        }
    },[roomId]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);

    useEffect(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    }

    return (
        <div className={state?'chat__active' : 'chat' }>
            <div className="chat__header">
                <IconButton className="arrow" onClick={onStateChange}>
                        <ArrowBackIcon />
                </IconButton>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen at {": "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()
                        }
                    </p>
                </div>

                <div className="chat__headerRight">
                    {/* <IconButton>
                        <ReorderIcon />
                    </IconButton> */}
                    {/* <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>  */}
                </div>
            </div>

            <div className="chat__body" ref={chatBodyRef}>
                {messages.map(message => (
                    // <p className={`chat__message ${message.name === user.displayName &&"chat__receiver"}`}>
                    <p className={`chat__message ${message.name === user.displayName ? "chat__receiver":""}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                {/* <InsertEmoticon/> */}
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message' type="text"/>
                    <button onClick={sendMessage} type='submit'><SendIcon/></button>
                </form>
                {/* <MicIcon/> */}
            </div>

        </div>
    )
}

export default Chat
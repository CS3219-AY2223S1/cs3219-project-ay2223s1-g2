import {
    Box,
    Paper,
    TextField,
    Button
} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8005');

const MessageButton = styled(Button)`
  padding-top: 15px;
`;

const MessageField = styled(TextField)`
  width: 100%;
`;

const MessageBar = styled(Box)`
  margin: 5px 10px 5px 10px;
`;

const MessageRight = styled(Box)`
  margin: 5px 10px;
  margin-left: 60%;
  padding: 15px;
  background: lightblue;
  min-width: 10%
  max-width: 40%;
  position: relative;
  float: right;
`;

const MessageLeft = styled(Box)`
  margin: 5px 10px;
  margin-right: 60%;
  padding: 15px;
  background: lightgrey;
  min-width: 10%
  max-width: 40%;
  position: relative;
  float: left;
`;

const ChatBox = styled(Paper)`
  height: calc(100% - 80px);
  margin: 10px;
  width: calc(100% - 20px);
  overflow-y: scroll;
`;

const ChatWindow = styled(Paper)`
  height: 300px;
  width: 100%;
`;

function ChatPage(username, roomId) {
    const [messages, setMessage] = useState([])
    const [chat, setChat] = useState('')

    function postMessage(event) {
        event.preventDefault()
        socket.emit("sendMessage", {message: chat, username: username})
    }

    useEffect(() => {
      socket.on("connect", () => {
        socket.emit("joinRoom", {roomId: roomId});
      });
      socket.on("newMessage", (data) => {
        console.log(data)
        setMessage((state) => [
            ...state,
            {
              username: data.username,
              message: data.message,
            },
          ]);
      })
    }, [username, roomId]);

    return (
      <ChatWindow>
        <ChatBox elevation={2}>
          {messages.map((msg, i) => {
            if (msg.username === username) {
              return <MessageRight key={i}>
                <span>{msg.message}</span>
              </MessageRight>
            } else {
              return <MessageLeft key={i}>
                <span>{msg.message}</span>
              </MessageLeft>
            }
          })}
        </ChatBox>
        <MessageBar>
              <form onSubmit={postMessage}>
                <Grid2 container spacing = {1}>
                  <Grid2 xs = {10}>
                    <MessageField value={chat} onInput= { e=>setChat(e.target.value) }/>
                  </Grid2>
                  <Grid2 xs = {2}>
                    <MessageButton type="submit"><SendIcon/></MessageButton>
                  </Grid2>
                </Grid2>
              </form>
        </MessageBar>
      </ChatWindow>
    )
}

export default ChatPage;

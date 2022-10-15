import {
    Box,
    Paper,
    TextField,
    Button
} from "@mui/material";
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import io from 'socket.io-client';
const socket = io('http://localhost:8002');
//https://codesandbox.io/s/material-ui-chat-drh4l?file=/src/Message.js

const MessageButton = styled(Button)`
  padding-top: 15px;
`;

const MessageField = styled(TextField)`
  width: 90%;
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

function ChatPage() {
    const [messages, setMessage] = useState([])
    const [chat, setChat] = useState('')

    function postMessage(event) {
        event.preventDefault()
        socket.emit("sendMessage", {message: chat, username:"user"})
    }

    useEffect(() => {
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
    }, []);

    return (
      <ChatWindow>
        <ChatBox elevation={2}>
          {messages.map((msg, i) => {
            if (msg.username == "user") {
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
                  <MessageField value={chat} onInput= { e=>setChat(e.target.value) }/>
                  <MessageButton type="submit"><SendIcon/></MessageButton>
              </form>
        </MessageBar>
      </ChatWindow>
    )
}

export default ChatPage;

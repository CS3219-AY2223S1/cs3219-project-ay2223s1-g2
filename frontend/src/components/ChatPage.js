import {
    Box,
    Paper,
    TextField,
    Button
} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState, useRef} from "react";
import io from 'socket.io-client';


const MessageButton = styled(Button)`
  padding: 5px;
  width: 100%;
  height: 100%;
  border: 1px solid rgb(196,196,196);
  min-width: 100%;

`;

const MessageField = styled(TextField)`
  width: 100%;
`;

const MessageBar = styled(Box)`
  margin: 5px 0px 5px 0px;
  padding: 0px;
`;

const MessageRight = styled(Box)`
  margin: 5px 10px;
  margin-left: 40%;
  padding: 0.8em;
  background: lightblue;
  min-width: 11%
  max-width: 60%;
  position: relative;
  float: right;
  border-radius: 4px;
`;

const MessageLeft = styled(Box)`
  margin: 5px 10px;
  margin-right: 40%;
  padding: 15px;
  background: lightgrey;
  min-width: 11%
  max-width: 60%;
  position: relative;
  float: left;
  border-radius: 4px;
`;

const ChatBox = styled(Paper)`
  height: calc(100% - 60px);
  // margin-left: 10px;
  // margin-right: 10px;
  padding: 5px;
  width: calc(100% - 10px);
  overflow-y: scroll;
  //border: 1px solid rgb(160, 169, 191);
`;

const ChatWindow = styled(Paper)`
  height: 290px;
  width: calc(100% - 10px);
  padding: 5px;
`;

function ChatPage(username, roomId) {
    const [messages, setMessage] = useState([]);
    const [chat, setChat] = useState('');
    
    const socket = io('http://' + process.env.REACT_APP_CHAT_SERVER_IP + ':' + process.env.REACT_APP_CHAT_SERVER_PORT);
    const body = useRef();

    function postMessage(event) {
        event.preventDefault()
        if (chat && chat.match(/^ *$/) === null) {
          socket.emit("sendMessage", { roomId: roomId, message: chat, username: username})
          setChat('');
        }
    }

    useEffect(() => {
      socket.on("connect", () => {
        socket.emit("joinRoom", {roomId: roomId});
      });
      socket.on("newMessage", (data) => {
        setMessage((state) => [
            ...state,
            {
              username: data.username,
              message: data.message,
            },
          ]);
      });
      socket.on("updateChatLog", (data) => {
        setMessage(data);
      });
      return () => {
        socket.off('connect');
        socket.off('newMessage');
        socket.off('updateChatLog');
      }
    }, [username, roomId]);

    useEffect(() => {
      if (body.current) {
        body.current.scrollTo({
          left: 0,
          top: body.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    },
    [messages])
    

    return (
      <ChatWindow elevation={0}>
        <ChatBox elevation={0} ref={body} style={{overflowY: "scroll"}}>
          <>
            {messages.map((msg, i) => {
              if (msg.username === username) {
                return <MessageRight key={i}>
                  <span style={{whiteSpace: "pre-wrap"}}>{msg.message}</span>
                </MessageRight>
              } else {
                return <MessageLeft key={i}>
                  <span style={{whiteSpace: "pre-wrap"}}>{msg.message}</span>
                </MessageLeft>
              }
            })}
          </>
        </ChatBox>
        <MessageBar>
              <form onSubmit={postMessage}>
                <Grid2 container spacing = {1}
                  sx={{padding: 0}}
                >
                  <Grid2 xs = {9}>
                    <MessageField 
                      value={chat}
                      label="" 
                      placeholder="Type a message..." 
                      multiline
                      rows="1"
                      inputProps={{
                        style: {
                          padding: "5px"
                        }
                      }}
                      InputProps={{
                        style: {
                          padding: "5px"
                        }
                      }}
                      onInput= { e=>setChat(e.target.value) }
                      onKeyDown={(e) => {
                        if(e.keyCode === 13 && !e.shiftKey) {
                          
                          postMessage(e);
                        }
                      }}
                    />
                  </Grid2>
                  <Grid2 xs = {3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="4px"
                  >
                    <MessageButton 
                      type="submit"
                      fullWidth
                      sx={{
                        height: "100%", 
                        padding: "6px 4px 3px 4px",
                        fontSize: {
                          lg: 16,
                          md: 14,
                          sm: 10,
                          xs: 6
                        }}}
                    >
                      Send
                    </MessageButton>
                  </Grid2>
                </Grid2>
              </form>
        </MessageBar>
      </ChatWindow>
    )
}

export default ChatPage;

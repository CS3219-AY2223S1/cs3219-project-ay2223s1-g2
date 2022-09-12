import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    CircularProgress
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link, useNavigate} from "react-router-dom";
import io from 'socket.io-client';
const socket = io('http://localhost:8001');
function FindingMatchPage() {
    const TIME_LIMIT = 30*1000
    const [findMatchFailed, setFindMatchFailed] = useState(false)
    const [percentageTimeLeft, setPercentageTimeLeft] = useState(100)
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT/1000)
    const [isFindingMatch, setIsFindingMatch] = useState(false)
    const navigate = useNavigate()
    // TODO:
    // 1. Console log time left every second
    // 2. Create countdown timer based on time left state. Button to trigger
    // 2a. Add handler to route to this page from DifficultyPage onClick FindMatch
    
    // 3. Connect page to Socket.io
    // 4. Emit find match event to server
    // 5. Change timer trigger to after emit find match


    
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const handleMatchFound = (roomId) => {
      navigate(`/room/${roomId}`)
    }

    useEffect(() => {
      console.log("mounting has occurred")
      socket.on('connect', () => {
        setIsConnected(true);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
  
      socket.on('pong', () => {
        setLastPong(new Date().toISOString());
      });

      socket.on('message', (message) => {
        console.log(message)
      })

      socket.on('matchSuccess', (roomId) => {
        console.log(`Match found. Room ID is ${roomId}`)
        handleMatchFound(roomId)
      })

      socket.on('matchFail', (message) => {
        console.log('Unable to find match.')
        console.log(message)
      })
  
      return () => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('pong');
        socket.off('message');
        socket.off('matchSuccess');
        socket.off('matchFail');
      };
    }, []);

    const handleFindMatch = () => {
      handleTimer()
      socket.emit('match', 'Finding match...');
      console.log('finding')
    }

    const handleTimer = () => {
        setIsFindingMatch(true)
        const startTime = Date.now()
        const updateTimer = () => {
            
            const currTime = Date.now()
            
            const timePassed = currTime-startTime
            
            const remainingTime = TIME_LIMIT - timePassed;

            if (remainingTime < 0) {
                setPercentageTimeLeft(0) // prevent wonky -ve values
                setTimeLeft(0)
                setIsFindingMatch(false) // re-enable find match button
                setFindMatchFailed(true)
            } else {
                setTimeLeft(Math.round(remainingTime/1000))
                setPercentageTimeLeft(Math.round(remainingTime/TIME_LIMIT*100))
                setTimeout(updateTimer, 100)
            }
        }

        //setTimeout every 0.5s, update time left by subtracting
        setTimeout(updateTimer, 100)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>
                {(findMatchFailed && !isFindingMatch) ? 'Unable to find a match. Try again?' : 'Finding a match...'}
            </Typography>
            {isFindingMatch && <Typography variant={"h3"} marginBottom={"2rem"}>
                {timeLeft+'s'}
            </Typography>}
            {isFindingMatch && <CircularProgress 
                    variant="determinate" value={percentageTimeLeft} 
                    size={200}
                    thickness={4} 
            />}
            <Box mt={5} display={"flex"} flexDirection={"column"} >
                <Button size={"large"} variant={"outlined"} onClick={handleFindMatch} disabled={isFindingMatch}>Find Match</Button>
            </Box>
        </Box>
    )
}

export default FindingMatchPage;

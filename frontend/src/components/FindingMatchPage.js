import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    CircularProgress
} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import io from 'socket.io-client';
const socket = io('http://localhost:8001');

function FindingMatchPage() {
  const [difficulty, setDifficulty] = useState(['Easy'])
  const navigate = useNavigate()

  const handleDifficulty = (
      event,
      newDifficulty
  ) => {
      setDifficulty([newDifficulty]) //uncomment for single selection difficulty
      //setDifficulty(newDifficulty)
      
  }


    const TIME_LIMIT = 30*1000
    const [findMatchFailed, setFindMatchFailed] = useState(false)
    const [percentageTimeLeft, setPercentageTimeLeft] = useState(100)
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT/1000)
    const [isFindingMatch, setIsFindingMatch] = useState(false)
    
    const location = useLocation()
 
    // TODO:
    // 1. Console log time left every second
    // 2. Create countdown timer based on time left state. Button to trigger
    // 2a. Add handler to route to this page from DifficultyPage onClick FindMatch
    
    // 3. Connect page to Socket.io
    // 4. Emit find match event to server
    // 5. Change timer trigger to after emit find match

    const handleMatchFound = (roomId) => {
      navigate(`/room/${roomId}`)
    }

    useEffect(() => {
      console.log("mounting has occurred")

      if (!findMatchFailed) {
        handleTimer()
        socket.emit('matchInit', {username: location.state.username, difficulty: location.state.difficulty[0]})
      }

      socket.on('matchSuccess', (roomId) => {
        if (!roomId) roomId = -1
        console.log(`Match found. Room ID is ${roomId}`)
        handleMatchFound(roomId)
      })

      socket.on('matchFailure', (message) => {
        console.log('Unable to find match.')
        console.log(message)
        setIsFindingMatch(false) // re-enable find match button
        setFindMatchFailed(true)
      })
  
      return () => {
        socket.off('connection');
        socket.off('matchSuccess');
        socket.off('matchFailure');
      };
    }, []);

    const handleFindMatch = () => {
      if (difficulty.length == 0) {
          console.log('Error! At least 1 difficulty level must be selected')
          return
      }
      handleTimer()
      console.log(difficulty[0])
      socket.emit('matchInit', {username: location.state.username, difficulty: difficulty[0]})
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
                console.log('30s has passed in client')
                setIsFindingMatch(false)
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
      <>
      {!isFindingMatch &&
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography variant={"h3"} marginBottom={"2rem"}>
            {!findMatchFailed ? 'Select a difficulty level' : 'Unable to find match. Try again?'}
          </Typography>
          <ToggleButtonGroup
              value={difficulty}
              exclusive //uncomment for single selection difficulty
              onChange={handleDifficulty}
              aria-label="Difficulty"
          >
              <ToggleButton value='Easy'>Easy</ToggleButton>
              <ToggleButton value='Medium'>Medium</ToggleButton>
              <ToggleButton value='Hard'>Hard</ToggleButton>
          </ToggleButtonGroup>
          
          <Box mt={5} display={"flex"} flexDirection={"column"} >
              <Button size={"large"} variant={"outlined"} onClick={handleFindMatch} disabled={isFindingMatch}>Find Match</Button>
          </Box>
        </Box>
      }
      {isFindingMatch &&
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>
              Finding a match...
            </Typography>
            {isFindingMatch && <Typography variant={"h3"} marginBottom={"2rem"}>
                {timeLeft+'s'}
            </Typography>}
            {isFindingMatch && <CircularProgress 
                    variant="determinate" value={percentageTimeLeft} 
                    size={200}
                    thickness={4} 
            />}
        </Box>
      }
      </>
    )
}

export default FindingMatchPage;

import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    CircularProgress,
    Card,
    CardActions,
    CardContent
} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import io from 'socket.io-client';
const socket = io('http://localhost:8001');

const ToggleButtonCardSX = {
  "&:hover": {
      backgroundColor: 'hsla(213, 100%, 50%, 0.3)' //color of normal button when hovered
  },
  "&.Mui-selected": {
      backgroundColor: 'hsla(213, 90%, 50%, 0.4)' //color of selected button
  },
  "&.Mui-selected:hover": {
      // color of selected button when hovered
      backgroundColor: 'hsla(213, 100%, 50%, 0.4)' 
  },
  backgroundColor: 'hsla(213, 80%, 50%, 0.2)' //default color
}


const ToggleButtonCardGroupSX = {
  "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px'
  },
  "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  minHeight: 275
}

const FindMatchButtonSX = {
  "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px'
  },
  "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  "&:hover": {
      //color of button when hovered
      backgroundColor: 'hsla(213, 100%, 50%, 0.3)',
      color: '#1976d2'
  },
  //default color
  backgroundColor: 'hsla(213, 80%, 50%, 0.2)', 
  color: "rgba(0, 0, 0, 0.54)",
  fontSize: 50,
  minWidth: 855,
  minHeight: 200,
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  border: "1px solid rgba(0, 0, 0, 0.12)",
}

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

    const handleMatchFound = (roomId, question) => {
      navigate(`/room/${roomId}`, {state: {question: question}})
    }

    useEffect(() => {
      console.log("mounting has occurred")

      if (!findMatchFailed) {
        handleTimer()
        socket.emit('matchInit', {username: location.state.username, difficulty: location.state.difficulty[0]})
      }

      socket.on('matchSuccess', (roomId, question) => {
        if (!roomId) roomId = -1
        console.log(`Match found. Room ID is ${roomId}`)
        handleMatchFound(roomId, question)
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
      if (difficulty.length === 0) {
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
          <Typography variant={"h3"} marginBottom={"2rem"} sx={{
            color: "rgba(0, 0, 0, 0.70)",
          }}>
            {!findMatchFailed ? 'Select a difficulty level' : 'Unable to find match. Try again?'}
          </Typography>
          <ToggleButtonGroup
                value={difficulty}
                exclusive //uncomment for single selection difficulty
                onChange={handleDifficulty}
                aria-label="Difficulty"
                sx={ToggleButtonCardGroupSX}
            >
                <ToggleButton className={'toggleButtonCard'}
                    value='Easy'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    Easy
                </ToggleButton>
                <ToggleButton className={'toggleButtonCard'}
                    value='Medium'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 40,
                            md: 40,
                            sm: 40,
                            xs: 40
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    Medium
                </ToggleButton>
                <ToggleButton className={'toggleButtonCard'}
                    value='Hard'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 56,
                            md: 56,
                            sm: 56,
                            xs: 56
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    Hard
                </ToggleButton>
            </ToggleButtonGroup>
            
            <Box mt={5} display={"flex"} flexDirection={"column"} >
                <Button size={"large"} 
                    variant={"normal"} 
                    onClick={handleFindMatch}
                    color='primary'
                    disabled={isFindingMatch}
                    sx={FindMatchButtonSX}
                >
                    Find Match!
                </Button>
            </Box>
        </Box>
      }
      {isFindingMatch &&
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"} sx={{
            color: "rgba(0, 0, 0, 0.7)",
          }}>
              Finding a match...
            </Typography>
            {isFindingMatch && <Typography variant={"h3"} marginBottom={"2rem"} sx={{
            color: "rgba(0, 0, 0, 0.7)",
          }}>
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

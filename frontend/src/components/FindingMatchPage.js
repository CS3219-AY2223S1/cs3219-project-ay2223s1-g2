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
import {Link} from "react-router-dom";

function FindingMatchPage() {
    const TIME_LIMIT = 30*1000
    const [findMatchFailed, setFindMatchFailed] = useState(false)
    const [percentageTimeLeft, setPercentageTimeLeft] = useState(100)
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT/1000)
    const [isFindingMatch, setIsFindingMatch] = useState(false)
    // TODO:
    // 1. Console log time left every second
    // 2. Create countdown timer based on time left state. Button to trigger
    // 2a. Add handler to route to this page from DifficultyPage onClick FindMatch
    
    // 3. Connect page to Socket.io
    // 4. Emit find match event to server
    // 5. Change timer trigger to after emit find match

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
                {findMatchFailed ? 'Unable to find a match. Try again?' : 'Finding a match...'}
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
                <Button size={"large"} variant={"outlined"} onClick={handleTimer} disabled={isFindingMatch}>Start Timer</Button>
            </Box>
        </Box>
    )
}

export default FindingMatchPage;

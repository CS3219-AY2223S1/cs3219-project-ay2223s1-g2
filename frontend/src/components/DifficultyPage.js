import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import io from 'socket.io-client';

const socket = io('http://localhost:8001');

function DifficultyPage() {
    
    const [difficulty, setDifficulty] = useState(['Easy'])
    const navigate = useNavigate()

    const handleDifficulty = (
        event,
        newDifficulty
    ) => {
        setDifficulty([newDifficulty]) 
        //setDifficulty(newDifficulty) //uncomment for single selection difficulty
        
    }

    const handleFindMatch = () => {
        if (difficulty.length === 0) {
            console.log('Error! At least 1 difficulty level must be selected')
            return
        }
        console.log(difficulty[0])
        let randomUsername = (Math.random() + 1).toString(36).substring(7)//stub username
        navigate(`/findmatch`, {
            state: {
                username: randomUsername, 
                difficulty: difficulty, 
            }
        })
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Select a difficulty level</Typography>
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
                <Button size={"large"} variant={"outlined"} onClick={handleFindMatch}>Find Match</Button>
            </Box>
        </Box>
    )
}

export default DifficultyPage;

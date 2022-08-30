import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link} from "react-router-dom";

function DifficultyPage() {

    const [difficulty, setDifficulty] = useState(['Easy'])

    const handleDifficulty = (
        event,
        newDifficulty
    ) => {
        //setDifficulty([newDifficulty]) //uncomment for single selection difficulty
        setDifficulty(newDifficulty)
        
    }

    const handleFindMatch = () => {
        if (difficulty.length == 0) {
            console.log('Error! At least 1 difficulty level must be selected')
            return
        }
        console.log(difficulty)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Select a difficulty level</Typography>
            <ToggleButtonGroup
                value={difficulty}
                //exclusive //uncomment for single selection difficulty
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

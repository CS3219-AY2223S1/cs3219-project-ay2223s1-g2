import {
    Box,
    Button,
    Typography
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link} from "react-router-dom";

function DifficultyPage() {

    const handleEasy = () => {
        console.log('EZPZ')
    }

    const handleMedium = () => {
        console.log('Gears are grinding')
    }

    const handleHard = () => {
        console.log('Oof')
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Select a difficulty level.</Typography>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-around"} width={"20%"} height={"60%"}>
                <Box m={1} >
                    <Button size={"large"} fullWidth={true} variant={"outlined"} onClick={handleEasy}>Easy</Button>
                </Box>
                <Box m={1}>
                    <Button size={"large"} fullWidth={true} variant={"outlined"} onClick={handleMedium}>Medium</Button>
                </Box>
                <Box m={1}>
                    <Button size={"large"} fullWidth={true} variant={"outlined"} onClick={handleHard}>Hard</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default DifficultyPage;

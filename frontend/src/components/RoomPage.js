import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
import {Link, useNavigate, useParams, useLocation} from "react-router-dom";

function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const { question } = state;
    console.log(question.data[0])
    const questionData = question.data[0]
    const handleNavigateHome = () => {
        navigate('/homepage')
    }

    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Typography variant={"h7"} marginBottom={"2rem"}>Room Number {params.id}</Typography>
            <Typography variant={"h3"} marginBottom={"2rem"}>Title: {questionData.title}</Typography>
            <Typography variant={"h5"} marginBottom={"2rem"}>{questionData.questionDesc}</Typography>
            <Button size={"Medium"} variant={"outlined"} onClick={handleNavigateHome}>Home</Button>
        </Box>
    )
}

export default RoomPage;

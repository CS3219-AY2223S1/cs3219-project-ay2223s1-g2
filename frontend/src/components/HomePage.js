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
import {Link, useParams} from "react-router-dom";

function HomePage() {
    const params = useParams();
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Welcome to PeerPrep</Typography>
        </Box>
    )
}

export default HomePage;

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Cookies from "universal-cookie";

function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/homepage");
    };
    const cookies = new Cookies();
    const username = cookies.get("username");
    const roomId = "hardcode";

    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>
                Room Number {params.id}
            </Typography>
            <CodeEditor username={username} roomId={roomId} />
            <Button
                size={"Medium"}
                variant={"outlined"}
                onClick={handleNavigateHome}
            >
                Home
            </Button>
        </Box>
    );
}

export default RoomPage;

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
import { Base64 } from 'js-base64';

function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const { question } = state;
    const questionData = question.data[0]

    const roomId = params.id

    const handleNavigateHome = () => {
        navigate('/homepage')
    }

    

    const questionBase64String = questionData.questionDesc
    const questionHtmlStr = Base64.decode(questionBase64String)
    
    //Alternative way to make html Node
    // make a new parser
    const parser = new DOMParser();

    // convert html string into DOM
    const questionHtml = parser.parseFromString(questionHtmlStr, "text/html").body;
    console.log(questionHtml.childNodes)
    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>{questionData.title}</Typography>
            <>
                <div dangerouslySetInnerHTML={{ __html: questionHtmlStr }} />
            </>

            {/* <Typography variant={"h5"} marginBottom={"2rem"}>{questionData.questionDesc}</Typography> */}
            <Button size={"Medium"} variant={"outlined"} onClick={handleNavigateHome}>Home</Button>
        </Box>
    )
}

export default RoomPage;

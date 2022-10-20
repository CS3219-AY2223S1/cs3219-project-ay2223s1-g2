import {
    Box,
    Button,
    Typography
} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import ChatPage from "./ChatPage";
import { Base64 } from 'js-base64';
import CodeEditor from "./CodeEditor";
import Cookies from "universal-cookie";

function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const { question } = state;
    const questionData = question.data[0]
    const roomId = params.id
    const handleNavigateHome = () => {
        navigate("/homepage");
    };
    const cookies = new Cookies();
    const username = cookies.get("username");
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
            <Grid2 container spacing = {2}>
            <Grid2 xs = {12}>
                <Typography variant={"h3"} marginBottom={"2rem"}>{questionData.title}</Typography>
                <>
                <div dangerouslySetInnerHTML={{ __html: questionHtmlStr }} />
                </>
             </Grid2>
                <Grid2 xs = {8}>
                    <CodeEditor username={username} roomId={roomId} />
                </Grid2>
                <Grid2 xs = {4}>
                    <div>
                        {ChatPage(username, roomId)}
                    </div>
                </Grid2>
            </Grid2>
            {/* <Typography variant={"h5"} marginBottom={"2rem"}>{questionData.questionDesc}</Typography> */}
            <Button size={"Medium"} variant={"outlined"} onClick={handleNavigateHome}>Home</Button>
        </Box>
    );
}

export default RoomPage;

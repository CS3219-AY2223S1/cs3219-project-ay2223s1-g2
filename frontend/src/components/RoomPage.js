import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import './RoomPage.css'
import Grid2 from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import ChatPage from "./ChatPage";
import { Base64 } from 'js-base64';
import CodeEditor from "./CodeEditor";
import Cookies from "universal-cookie";

const CodeEditorTitleCard = styled(Card)`
  background-color: white;
//   display: inline-block;
`;

function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const {state} = useLocation();
    const { question } = state;
    const questionData = question.data
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
            <Grid2 container rowSpacing={1} columnSpacing={2}>
                <Grid2 xs = {12}>   
                    <Card>
                        <CardContent>
                            <Typography variant={"h3"} marginBottom={"2rem"}>{questionData.title}</Typography>
                            <>
                                <Box>
                                    <div dangerouslySetInnerHTML={{ __html: questionHtmlStr }} />
                                </Box>
                            </>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 item xs = {8} justifyContent="flex-start" >
                    <CodeEditorTitleCard elevation={1}>
                        <Typography noWrap 
                            align={"left"} 
                            padding="6px 8px 2px 8px" 
                            lineHeight={1}
                            sx={{color: "rgba(0, 0, 0, 0.7)",
                                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Code Editor
                        </Typography>
                        <CodeEditor username={username} roomId={roomId} />
                    </CodeEditorTitleCard>
                </Grid2>
                <Grid2 xs = {4} justifyContent="flex-start">
                    <CodeEditorTitleCard elevation={1} >
                        <Typography noWrap 
                            align={"left"} 
                            padding="6px 8px 2px 8px" 
                            lineHeight={1}
                            sx={{color: "rgba(0, 0, 0, 0.7)",
                                borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            Chat
                        </Typography>
                        {ChatPage(username, roomId)}
                    </CodeEditorTitleCard>
                </Grid2>


                {/* <Grid2 xs = {8}>
                    <Card>
                        <CodeEditor username={username} roomId={roomId} />
                    </Card>
                </Grid2> */}
                {/* <Grid2 xs = {4}>
                    {ChatPage(username, roomId)}
                </Grid2> */}
                
                {/* Backup <Grid2 xs = {12}>   
                    <Card>
                        <CardContent>
                            <Typography variant={"h3"} marginBottom={"2rem"}>{questionData.title}</Typography>
                            <>
                                <Box>
                                    <div dangerouslySetInnerHTML={{ __html: questionHtmlStr }} />
                                </Box>
                            </>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 item xs = {8} justifyContent="flex-start" >
                    <CodeEditorTitleCard elevation={1}>
                        <Typography noWrap align={"center"} padding="4px 8px 2px 8px" lineHeight={1}>
                            Code Editor
                        </Typography>
                    </CodeEditorTitleCard>
                </Grid2>
                <Grid2 xs = {2} justifyContent="flex-start">
                    <CodeEditorTitleCard elevation={1} >
                        <Typography noWrap align={"center"} padding="4px 8px 2px 8px" lineHeight={1}>
                            Chat
                        </Typography>
                    </CodeEditorTitleCard>
                </Grid2>
                <Grid2 xs = {8}>
                    <Card>
                        <CodeEditor username={username} roomId={roomId} />
                    </Card>
                </Grid2>
                <Grid2 xs = {4}>
                    {ChatPage(username, roomId)}
                </Grid2> */}
            </Grid2>
            {/* <Typography variant={"h5"} marginBottom={"2rem"}>{questionData.questionDesc}</Typography> */}
        </Box>
    );
}

export default RoomPage;

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from "./components/LoginPage";
import DifficultyPage from "./components/DifficultyPage";
import FindingMatchPage from "./components/FindingMatchPage";
import RoomPage from "./components/RoomPage";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import {Box} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        {/* <Route exact path="/" element={<Navigate replace to="/homepage" />}></Route> */}
                        <Route path="/homepage" element={<HomePage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/difficulty" element={<DifficultyPage/>}/>
                        <Route path="/findmatch" element={<FindingMatchPage/>}/>
                        <Route path="/room/:id" element={<RoomPage/>}/>
                        <Route path="/chat" element={<ChatPage/>}/>
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

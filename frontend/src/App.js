import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from "./components/LoginPage";
import DifficultyPage from "./components/DifficultyPage";
import FindingMatchPage from "./components/FindingMatchPage";
import RoomPage from "./components/RoomPage";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import UpdatePass from "./components/UpdatePass";
import About from "./components/About";
import {Box} from "@mui/material";
import Navbar from "./components/Navbar";
import EndPage from "./components/EndPage";

function App() {
    return (
        <div className="App">
            <Box
                style={{ marginTop: "20px" }}
                display={"flex"}
                flexDirection={"column"}
                padding={"4rem"}
            >
                <Router>
                    <Navbar />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<Navigate replace to="/login" />}
                        ></Route>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/passChange" element={<UpdatePass />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/chat" element={<ChatPage/>}/>
                        <Route path="/endPage" element={<EndPage />} />
                        <Route
                            path="/difficulty"
                            element={<DifficultyPage />}
                        />
                        <Route
                            path="/findmatch"
                            element={<FindingMatchPage />}
                        />
                        <Route path="/room/:id" element={<RoomPage />} />
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import DifficultyPage from "./components/DifficultyPage";
import FindingMatchPage from "./components/FindingMatchPage";
import RoomPage from "./components/RoomPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import UpdatePass from "./components/UpdatePass";
import About from "./components/About";
import { Box } from "@mui/material";
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
                        <Route
                            path="/passChange"
                            element={
                                <ProtectedRoute>
                                    <UpdatePass />
                                </ProtectedRoute>
                            }
                        />
                        {/* <Route
                            path="/about"
                            element={
                                <ProtectedRoute>
                                    <About />
                                </ProtectedRoute>
                            }
                        /> */}
                        <Route path="/homepage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
                        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                        <Route path="/endPage" element={<ProtectedRoute><EndPage /></ProtectedRoute>} />
                        <Route
                            path="/difficulty"
                            element={<ProtectedRoute><DifficultyPage /></ProtectedRoute>}
                        />
                        <Route
                            path="/findmatch"
                            element={<ProtectedRoute><FindingMatchPage /></ProtectedRoute>}
                        />
                        <Route path="/room/:id" element={<ProtectedRoute><RoomPage /></ProtectedRoute>} />
                    </Routes>
                </Router>
            </Box>
        </div>
    );
}

export default App;

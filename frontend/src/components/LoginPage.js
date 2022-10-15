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
import {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_WRONG_CREDENTIALS,
} from "../constants";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const cookies = new Cookies();
    const [isLoginSuccess, setisLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setisLoginSuccess(false);
        const res = await axios
            .post(URL_USER_SVC + "/login", { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_WRONG_CREDENTIALS) {
                    setErrorDialog("Wrong credentials provided");
                } else {
                    setErrorDialog("Please try again later");
                }
            });
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setSuccessDialog("Login Success");
            cookies.set("token", res.data.token);
            cookies.set("username", username);
            setisLoginSuccess(true);
            navigate("/difficulty");
        }
    };

    const closeDialog = () => setIsDialogOpen(false);

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Success");
        setDialogMsg(msg);
    };

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Error");
        setDialogMsg(msg);
    };

    return (
        <Box display={"flex"} flexDirection={"column"} width={"30%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>
                Log in
            </Typography>
            <TextField
                label="Username"
                variant="standard"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: "1rem" }}
                autoFocus
            />
            <TextField
                label="Password"
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "2rem" }}
            />
            <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
            >
                <Button variant={"outlined"} onClick={handleLogin}>
                    Log in
                </Button>
            </Box>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isLoginSuccess ? (
                        <Button component={Link} to="/login">
                            Log in
                        </Button>
                    ) : (
                        <Button onClick={closeDialog}>Done</Button>
                    )}
                </DialogActions>
            </Dialog>
            <Link to="/signup">Don't have an account?</Link>
        </Box>
    );
}

export default LoginPage;

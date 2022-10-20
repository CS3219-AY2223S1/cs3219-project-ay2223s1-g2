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
import { Link} from "react-router-dom";
import Cookies from "universal-cookie";

function UpdatePass() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState("");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const cookies = new Cookies();
    const [isLoginSuccess, setisLoginSuccess] = useState(false);

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${cookies.get("token")}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const handlePasswordChange = async () => {
        setisLoginSuccess(false);
        const res = await axios
            .post(URL_USER_SVC + "/updatePassword", {
                username,
                password,
                newPassword,
            })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_WRONG_CREDENTIALS) {
                    setErrorDialog("Wrong credentials provided");
                } else {
                    setErrorDialog("Please try again later");
                }
            });
        if (res && res.status === STATUS_CODE_SUCCESS) {
            setSuccessDialog("Update Password Success");
            setisLoginSuccess(true);
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
                Update Password
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
                label="Old Password"
                variant="standard"
                type="OldPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "2rem" }}
            />
            <TextField
                label="New Password"
                variant="standard"
                type="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ marginBottom: "2rem" }}
            />

            <TextField
                label="Confirmed Password"
                variant="standard"
                type="confirmedNewPassword"
                value={confirmedNewPassword}
                onChange={(e) => setConfirmedNewPassword(e.target.value)}
                sx={{ marginBottom: "2rem" }}
            />

            <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-end"}
            >
                <Button variant={"outlined"} onClick={handlePasswordChange}>
                    Update
                </Button>
            </Box>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isLoginSuccess ? (
                        <Button component={Link} to="/About">
                            Log in
                        </Button>
                    ) : (
                        <Button onClick={closeDialog}>Done</Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UpdatePass;

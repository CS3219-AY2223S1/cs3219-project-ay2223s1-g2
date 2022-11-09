import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Container,
    TextField,
    Grid,
    Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import {
    STATUS_CODE_SUCCESS,
    STATUS_CODE_WRONG_CREDENTIALS,
} from "../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    const usernameCookie = cookies.get("username");
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

    const validatePassword = (pass) => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(pass);
    };

    const handlePasswordChange = async () => {
        setisLoginSuccess(false);
        if (newPassword !== confirmedNewPassword) {
            setErrorDialog("The typed passwords do not match");
        } else if (!validatePassword(newPassword)) {
            setErrorDialog(
                "The passwords do not meet basic requirements\n1.Minimum of 8 characters\n2.Contains at least one Uppercase and lowercase character\n3.Contains special character"
            );
        } else {
            const res = await axios
                .post(URL_USER_SVC + "/updatePassword", {
                    username: usernameCookie,
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

    const useStyles = makeStyles((theme) => ({
        "@global": {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <FontAwesomeIcon
                        size="3x"
                        style={{ color: "#0033cc" }}
                        icon={faLaptopCode}
                    />
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Current Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    error={!validatePassword(newPassword)}
                                    helperText={
                                        !validatePassword(newPassword)
                                            ? "Password does not meet requirements"
                                            : ""
                                    }
                                    id="newPassword"
                                    autoComplete="newPassword"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Confirm New Password"
                                    type="password"
                                    value={confirmedNewPassword}
                                    onChange={(e) =>
                                        setConfirmedNewPassword(e.target.value)
                                    }
                                    error={newPassword !== confirmedNewPassword}
                                    helperText={
                                        newPassword !== confirmedNewPassword
                                            ? "Passwords do not match"
                                            : ""
                                    }
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginTop: "0.5rem" }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handlePasswordChange}
                            className={classes.submit}
                        >
                            Change Password
                        </Button>
                    </form>
                </div>
                <Box mt={5}></Box>
            </Container>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isLoginSuccess ? (
                        <Button component={Link} to="/difficulty">
                            Log in
                        </Button>
                    ) : (
                        <Button onClick={closeDialog}>Done</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default UpdatePass;

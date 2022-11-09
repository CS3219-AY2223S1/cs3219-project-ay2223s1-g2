import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants";
import { Link } from "react-router-dom";
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
    Tooltip,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdornment from "@mui/material/InputAdornment";
import QuestionMark from "@mui/icons-material/QuestionMark";
import { faLaptopCode, faInfo } from "@fortawesome/free-solid-svg-icons";
import CssBaseline from "@material-ui/core/CssBaseline";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setconfirmedPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);

    const handleSignup = async () => {
        setIsSignupSuccess(false);
        if (confirmedPassword !== password) {
            setErrorDialog("The typed passwords do not match");
        } else if (!validatePassword(password)) {
            setErrorDialog(
                "The password does not meet basic requirements\n1.Minimum of 8 characters\n2.Contains at least one uppercase and lowercase character\n3.Contains special character"
            );
        } else {
            const res = await axios
                .post(URL_USER_SVC, { username, password })
                .catch((err) => {
                    if (err.response.status === STATUS_CODE_CONFLICT) {
                        setErrorDialog("This username already exists");
                    } else {
                        setErrorDialog("Please try again later");
                    }
                });
            if (res && res.status === STATUS_CODE_CREATED) {
                setSuccessDialog("Account successfully created");
                setIsSignupSuccess(true);
            }
        }
    };

    const closeDialog = () => setIsDialogOpen(false);

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Success");
        setDialogMsg(msg);
    };

    const validatePassword = (pass) => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(pass);
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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
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
                                    name="password"
                                    InputLabelProps={{
                                        style: { pointerEvents: "auto" },
                                    }}
                                    label="Password"
                                    type="password"
                                    InputProps={{endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title="Must contain minimum of 8 characters with at least 1 uppercase letter, 1 lowercase letter and 1 special character">
                                                <FontAwesomeIcon style={{ color: "#0033cc" }} icon={faInfo}/>
                                            </Tooltip>
                                        </InputAdornment>}}
                                    // InputProps={{endAdornment:<InputAdornment position="end"><QuestionMark sx={{ color: "#0089ff", fontSize: 20 }} /></InputAdornment>}}
                                    value={password}
                                    error={
                                        password.length !== 0 &&
                                        !validatePassword(password)
                                    }
                                    helperText={
                                        password.length !== 0 &&
                                        !validatePassword(password)
                                            ? "Password does not meet requirements"
                                            : ""
                                    }
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
                                    error={password !== confirmedPassword}
                                    helperText={
                                        password !== confirmedPassword
                                            ? "Passwords do not match"
                                            : ""
                                    }
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmedPassword}
                                    onChange={(e) =>
                                        setconfirmedPassword(e.target.value)
                                    }
                                    name="confirmPassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginTop: "0.5rem" }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSignup}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
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
                    {isSignupSuccess ? (
                        <Button component={Link} to="/login">
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

export default SignupPage;

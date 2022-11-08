import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    IconButton,
    Tooltip,
    Avatar,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from "@mui/material";
import axios from "axios";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import { URL_USER_SVC } from "../configs";
import {
    STATUS_CODE_INTERNAL_SERVER_ERROR,
    STATUS_CODE_SUCCESS,
} from "../constants";
function Navbar() {
    const [value, setValue] = useState();
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const settings = [
        // { text: "Profile", href: "/profile" },
        { text: "Change Password", href: "/passChange" },
    ];
    const [isActive, setIsActive] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMsg, setDialogMsg] = useState("");
    const cookies = new Cookies();
    const navigate = useNavigate();
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const setErrorDialog = (msg) => {
        setIsDialogOpen(true);
        setDialogTitle("Error");
        setDialogMsg(msg);
    };
    const handleLogout = async () => {
        const res = await axios
            .post(URL_USER_SVC + "/logout", {})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_INTERNAL_SERVER_ERROR) {
                    setErrorDialog("Internal Server Error");
                } else {
                    setErrorDialog("Please try again later");
                }
            });
        if (res && res.status === STATUS_CODE_SUCCESS) {
            cookies.remove("token");
            cookies.remove("username");
            navigate("/login");
        }
    };
    useEffect(() => {
        let path = location.pathname;
        if (path.includes("login") || path.includes("signup")) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }, [location.pathname]);

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${cookies.get("token")}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return (
        <React.Fragment>

            {isActive && (
                <AppBar className="navBar">
                    <Toolbar>
                        <FontAwesomeIcon icon={faLaptopCode} />
                        <p style={{ marginLeft: "0.2rem" }}>Peerprep</p>
                        {
                            <>
                                <Tabs
                                    sx={{ marginLeft: "auto" }}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    value={value}
                                    onChange={(e, value) => setValue(value)}
                                >
                                    {/* {isActive && <Tab
                                    label="Home"
                                    LinkComponent={Link}
                                    to={"/homepage"}
                                />}
                                <Tab
                                    label="About Us"
                                    LinkComponent={Link}
                                    to={"/about"}
                                /> */}
                                    {isActive && (
                                        <Tab
                                            label="Match"
                                            LinkComponent={Link}
                                            to={"/difficulty"}
                                        />
                                    )}
                                </Tabs>
                                {isActive && (
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open User Settings">
                                            <IconButton
                                                onClick={handleOpenUserMenu}
                                                sx={{ p: 0 }}
                                            >
                                                <Avatar
                                                    alt="U"
                                                    src="/static/images/avatar/2.jpg"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: "45px" }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting) => (
                                                <Link
                                                    to={setting.href}
                                                    style={{ color: "#111111" }}
                                                >
                                                    <MenuItem
                                                        key={setting.text}
                                                        onClick={
                                                            handleCloseUserMenu
                                                        }
                                                    >
                                                        <Typography textAlign="center">
                                                            {setting.text}
                                                        </Typography>
                                                    </MenuItem>
                                                </Link>
                                            ))}
                                            <MenuItem
                                                key={`Logout`}
                                                onClick={handleLogout}
                                            >
                                                <Typography textAlign="center">
                                                    {"Log out"}
                                                </Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                )}
                            </>
                        }
                    </Toolbar>
                </AppBar>
            )}
        </React.Fragment>
    );
}

export default Navbar;

import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "codemirror";
import io from "socket.io-client";
import { Text } from "@chakra-ui/react";

const CodeEditor = (params) => {
    console.log(params);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const editor = CodeMirror.fromTextArea(
            document.getElementById("code-editor"),
            {
                lineNumbers: true,
                mode: "javascript",
            }
        );

        const socket = io('http://' + process.env.REACT_APP_COLLAB_SERVER_IP + ':' + process.env.REACT_APP_COLLAB_SERVER_PORT, {
            transports: ["websocket"],
        });

        socket.on("codeChange", (code) => {
            console.log("codeChange triggered", code);
            editor.setValue(code);
        });

        socket.on("connect_error", (err) => {
            console.log(
                `Client-side socket connection error due to ${err.message}`
            );
        });

        socket.on("connect", () => {
            console.log(
                `socketid is ${socket.id},roomID is ${
                    params.roomId
                } and userID is ${
                    params.username
                } annd its type is ${typeof params.username}`
            );
            socket.emit("roomConnect", {
                roomId: params.roomId,
                username: params.username,
            });
        });

        socket.on("disconnect", () => {
            console.log("Client side disconnected");
        });

        socket.on("roomConnect", (room) => {
            console.log(`roomConnect user triggered`);
            editor.setValue(room.code);
            setUsers(room.users);
        });

        editor.on("change", (instance, changes) => {
            const { origin } = changes;
            if (origin !== "setValue") {
                socket.emit("codeChange", instance.getValue());
            }
        });
    }, []);

    return (
        <Box>
            {/* <Text>
                How many people are connected: <b> {users.length}</b>
            </Text> */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mode}
                        label="mode"
                        onChange={handleChange}
                    >
                        <MenuItem value={"javascript"}>JavaScript</MenuItem>
                        <MenuItem value={"python"}>Python</MenuItem>
                        <MenuItem value={"rust"}>Rust</MenuItem>
                        <MenuItem value={"go"}>Go</MenuItem>
                        <MenuItem value={"dockerfile"}>Dockerfile</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <textarea id="code-editor" />
        </Box>
    );
};

export default CodeEditor;

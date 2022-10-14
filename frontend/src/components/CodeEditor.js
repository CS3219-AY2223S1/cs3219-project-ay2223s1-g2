import React, { useEffect, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import CodeMirror from "codemirror";
import io from "socket.io-client";
import { Text } from "@chakra-ui/react";
import { useStore } from "./DataStore";

const CodeEditor = () => {
    const [users, setUsers] = useState([]);
    const { username, roomId } = useStore(({ username, roomId }) => ({
        username,
        roomId,
    }));
    const userHard = "Sheeshs";
    const roomHard = "19929b22-14c3-4460-9f18-d12f63bf882a";
    useEffect(() => {
        const editor = CodeMirror.fromTextArea(
            document.getElementById("code-editor"),
            {
                lineNumbers: true,
                mode: "javascript",
            }
        );

        const socket = io("http://localhost:8002/", {
            transports: ["websocket"],
        });

        socket.on("codeChange", (code) => {
            console.log("codeChange triggered", code);
            editor.setValue(code);
        });

        socket.on("connect_error", (err) => {
            console.log(`Connection Error due to ${err.message}`);
        });

        socket.on("connect", () => {
            console.log("Connected");
            console.log(
                `socketid is ${socket.id},roomID is ${roomHard} and userID is ${userHard}`
            );
            // socket.emit("roomConnect", {roomId,username}); correct one here!
            socket.emit("roomConnect", {
                roomId: roomHard,
                username: userHard,
            });
        });

        socket.on("disconnect", () => {
            console.log("Client side disconnected");
        });

        socket.on("roomConnect", (users) => {
            console.log("roomConnect user triggered");
            setUsers(users);
        });

        editor.on("change", (instance, changes) => {
            const { origin } = changes;
            if (origin !== "setValue") {
                socket.emit("codeChange", instance.getValue());
            }
        });
    }, []);

    return (
        <>
            <Text fontSize="2xl">
                How many people are connected: <b> {users.length}</b>
            </Text>

            <textarea id="code-editor" />
        </>
    );
};

export default CodeEditor;

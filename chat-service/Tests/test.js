import { io as Client } from "socket.io-client";
import { io as Server } from "../index.js";
import { assert } from "chai";

describe("Chat service tests", () => {
  let  socket;

    before(function(done) {
        // Setup
        socket = Client.connect('http://localhost:8005');
        socket.on('connect', function() {
            done();
        });
        socket.on('disconnect', function() {
        })
    });

    after(function(done) {

        if(socket.connected) {
            socket.disconnect();
        }
        done();
    });

    describe('Chat controller test', function() {

        it('join Room test', function(done) {
            socket.emit("joinRoom", {roomId: "A1BCDEFG"})
            socket.on("updateChatLog", function() {
                assert(true);
                done();
            });
        });

        it('send message test', function(done) {
            socket.emit("sendMessage", {roomId: "A1BCDEFG", username:"user",message:"Hello World"})
            socket.on("newMessage", function(data) {
                assert(data.roomId == "A1BCDEFG" && data.username == "user" && data.message == "Hello World");
                done();
            });
        });

    });
    
});
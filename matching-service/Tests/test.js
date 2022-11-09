import "dotenv/config";
import axios from 'axios'
import chai from "chai";
import { assert, expect } from "chai";
import { io as Server } from "../index.js";
import { io as Client } from "socket.io-client";
import sinon from 'sinon';

describe("Matching Service tests", () => {
  let  socket1;
  let  socket2;
  let clock;
    

    describe('Matching Service Controller 2 clients test', function() {
        before(function(done) {
            // Setup
            socket1 = Client.connect('http://localhost:8001', { forceNew: false });
            
            socket1.on('connect', function() {
                socket2 = Client.connect('http://localhost:8001', { forceNew: false, multiplex: true });
                
                socket2.on('connect', function() {
                    done();
                });
                
            });
        });
    
        after(function(done) {
            if(socket1.connected) {
                socket1.disconnect();
            }
            if(socket2.connected) {
                socket2.disconnect();
            }
            done();
        });

        it('Valid matchInit test', function(done) {
            
            socket1.emit("matchInit", {username: "user1", difficulty: "Easy"})
            socket2.emit("matchInit", {username: "user2", difficulty: "Easy"})
            var stub = sinon.stub(axios, "get")
            stub.resolves({data: "fake data"})

            socket1.on("matchSuccess", function(roomId1, question1) {
                socket2.on("matchSuccess", function(roomId2, question2) {
                    assert(roomId1 == roomId2 && question1.data == question2.data);
                    done();
                });
            });
            
        });
    });
});
import "dotenv/config";
import chai from "chai";
import chaiHttp from "chai-http";
import { app as server } from "../index.js";
chai.should();
chai.use(chaiHttp);

const username = "testSubject1";
const password = "test@12345";
const username2 = "testSubject12";
const newPassword = "12345@test";
var token = "";

// Test the Get Route
describe("/GET healthcheck", () => {
    it("it should get hello world", (done) => {
        chai.request(server)
            .get("/api/user")
            .end((error, response) => {
                response.text.should.equal("Hello World from user-service");
                response.should.have.status(200);
                done();
            });
    });
});

// Test Create Post Call
describe("Test POST Creation of Users", () => {
    it("New user created", (done) => {
        chai.request(server)
            .post("/api/user")
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password,
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Created new user testSubject1 successfully!"
                );
                res.should.have.status(201);
                done();
            });
    });

    it("Fail to create duplicate user", (done) => {
        chai.request(server)
            .post("/api/user")
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password,
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "(Duplicate Username): Kindly pick another username."
                );
                res.should.have.status(400);
                done();
            });
    });
});
describe("Test Login Success", () => {
    it("Login Success", (done) => {
        chai.request(server)
            .post("/api/user/login")
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password,
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Authentication Success: Log-in Completed"
                );
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });

    it("Login Failure Invalid Password", (done) => {
        chai.request(server)
            .post("/api/user/login")
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password + "Invalid",
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Authentication Error: Wrong log-in credentials"
                );
                res.should.have.status(401);
                done();
            });
    });
});

describe("Test Update Password Success", () => {
    it("Update password failure due to wrong password", (done) => {
        chai.request(server)
            .post("/api/user/updatePassword")
            .set({ Authorization: `Bearer ${token}` })
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password + "Invalid",
                newPassword: newPassword,
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Authentication Error: Wrong credentials"
                );
                res.should.have.status(401);
                done();
            });
    });

    it("Update password success", (done) => {
        chai.request(server)
            .post("/api/user/updatePassword")
            .set({ Authorization: `Bearer ${token}` })
            .set("content-type", "application/json")
            .send({
                username: username,
                password: password,
                newPassword: newPassword,
            })
            .end((err, res) => {
                res.body.message.should.equal("User Updated");
                res.should.have.status(200);
                done();
            });
    });

    it("Login Success after password change", (done) => {
        chai.request(server)
            .post("/api/user/login")
            .set("content-type", "application/json")
            .send({
                username: username,
                password: newPassword,
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Authentication Success: Log-in Completed"
                );
                token = res.body.token;
                res.should.have.status(200);
                done();
            });
    });
});
describe("Delete /api/user/deleteUser", () => {
    it("Delete user with wrong password Failure", (done) => {
        chai.request(server)
            .delete("/api/user/deleteUser")
            .set({ Authorization: `Bearer ${token}` })
            .send({
                username: username,
                password: newPassword + "Invalid",
            })
            .end((err, res) => {
                res.body.message.should.equal(
                    "Authentication Error: Wrong credentials"
                );
                res.should.have.status(401);
                done();
            });
    });

    it("Delete valid user", (done) => {
        chai.request(server)
            .delete("/api/user/deleteUser")
            .set({ Authorization: `Bearer ${token}` })
            .send({
                username: username,
                password: newPassword,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.message.should.equal("User deleted");
                done();
            });
    });
});

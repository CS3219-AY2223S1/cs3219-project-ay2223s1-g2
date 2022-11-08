import "dotenv/config";
import chai from "chai";
import chaiHttp from 'chai-http';
import { expect } from "chai";
import { app } from './index.js';

chai.use(chaiHttp)
describe("Question Service tests", () => {
  let  socket;

    before(function(done) {
        done()
    });

    after(function(done) {
        done()
    });

    describe('Question Service Valid REST API Calls', function() {
        it('it should GET random Easy Question', (done) => {
            chai.request('http://localhost:5200')
            .get('/api/randomquestion')
            .query({difficulty: 'Easy'})
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body.data[0].title).to.be.a('string'); 
                expect(res.body.data[0].questionDesc).to.be.a('string'); 
                expect(res.body.data[0].topic).to.be.a('array'); 
                expect(res.body.data[0].difficulty).to.equal("Easy");
                done();
            });
        });

        it('it should GET random Medium Question', (done) => {
            chai.request('http://localhost:5200')
            .get('/api/randomquestion')
            .query({difficulty: 'Medium'})
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body.data[0].title).to.be.a('string'); 
                expect(res.body.data[0].questionDesc).to.be.a('string'); 
                expect(res.body.data[0].topic).to.be.a('array'); 
                expect(res.body.data[0].difficulty).to.equal("Medium");
                done();
            });
        });

        it('it should GET random Hard Question', (done) => {
            chai.request('http://localhost:5200')
            .get('/api/randomquestion')
            .query({difficulty: 'Hard'})
            .end((err, res) => {
                expect(res).to.have.status(200); 
                expect(res.body.data[0].title).to.be.a('string'); 
                expect(res.body.data[0].questionDesc).to.be.a('string'); 
                expect(res.body.data[0].topic).to.be.a('array'); 
                expect(res.body.data[0].difficulty).to.equal("Hard");
                done();
            });
        });
    });

    describe('Question Service Inalid REST API Calls', function() {
        it('it should safely fail to GET invalid difficulty value question', (done) => {
            chai.request('http://localhost:5200')
            .get('/api/randomquestion')
            .query({difficulty: 'INVALID'})
            .end((err, res) => {
                expect(res).to.have.status(500); 
                expect(res.body.status).to.equal('Invalid difficulty value provided'); 
                expect(res.body.message).to.equal('Invalid difficulty value provided'); 
                // expect(res.body.data[0].title).to.be.a('string'); 
                // expect(res.body.data[0].questionDesc).to.be.a('string'); 
                // expect(res.body.data[0].topic).to.be.a('array'); 
                // expect(res.body.data[0].difficulty).to.equal("Hard");
                done();
            });
        });

        it('it should safely fail to GET invalid URL', (done) => {
            chai.request('http://localhost:5200')
            .get('/invalid/url')
            .end((err, res) => {
                // console.log(res)
                expect(res).to.have.status(404); 
                done();
            });
        });
    });
});
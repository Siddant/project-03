/* global api, describe, it, expect, beforeEach */
const User = require("../../models/user");
const { userData } = require("../mock_data");
const jwt = require("jsonwebtoken");

let userId;

describe("POST /register", () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id.toString();
      })
      .then(() => done());
  });
  it("should return a token", done => {
    api
      .post("/api/login")
      .send(userData)
      .end((err, res) => {
        jwt.verify(res.body.token, process.env.SECRET, (err, payload) => {
          expect(payload.sub).to.eq(userId);
          expect(res.body.token.split(".").length).to.eq(3);
          done();
        });
      });
  });
  it("should return a 401 response if the password is bad", done => {
    const badData = { email: "test@test.com", password: "bad" };
    api
      .post("/api/login")
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it("should return a 401 response if the user doesn't exist", done => {
    const badData = { email: "bad@test.com", password: "test" };
    api
      .post("/api/login")
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});

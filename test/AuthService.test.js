/* eslint-disable no-undef */
const chai = require("chai");
const config = require("../config/config");
const apiCaller = require("./apiCaller");
const getToken = require("./getToken");

// Testing account
const testUser = {
  firstName: "Test",
  lastName: "User",
  email: "test@mail.com",
  password: "test1234",
  confirmPassword: "test1234"
};

// Edited account
const editedUser = {
  firstName: "New",
  lastName: "Test",
  email: "new@test.com",
  password: "new_test_user",
  confirmPassword: "new_test_user"
};

describe("Auth Service", () => {
  describe("Registration", () => {
    it("should return the user object", async () => {
      const response = await apiCaller(
        "post",
        config.AUTH_SERVER_PORT,
        "/auth/register",
        testUser
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("object");
      chai
        .expect(response.data)
        .to.have.include.keys(
          "_id",
          "type",
          "firstName",
          "lastName",
          "email",
          "handle",
          "password",
          "profilePicture",
          "createdAt"
        );
    });
  });
  describe("Login", () => {
    it("should return a token with the success and timestamp keys", async () => {
      const response = await apiCaller(
        "post",
        config.AUTH_SERVER_PORT,
        "/auth/login",
        testUser
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("object");
      chai
        .expect(response.data)
        .to.have.all.keys("success", "timestamp", "token");
    });
  });
  describe("Edit", () => {
    it("should return the edited user as an object", async () => {
      const token = await getToken({ email: testUser.email, password: testUser.password });
      const response = await apiCaller(
        "put",
        config.AUTH_SERVER_PORT,
        "/auth/edit",
        editedUser,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("object");
      chai
        .expect(response.data)
        .to.have.all.keys(
          "_id",
          "__v",
          "type",
          "firstName",
          "lastName",
          "email",
          "handle",
          "password",
          "profilePicture",
          "createdAt"
        );
    });
  });
  describe("Current", () => {
    it("should return the data for the current user", async () => {
      const token = await getToken({ email: editedUser.email, password: editedUser.password });
      const response = await apiCaller(
        "get",
        config.AUTH_SERVER_PORT,
        "/auth/current",
        null,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("object");
      chai
        .expect(response.data)
        .to.have.all.keys(
          "id",
          "type",
          "firstName",
          "lastName",
          "email",
          "handle",
          "profilePicture",
          "createdAt"
        );
    });
  });
  describe("Delete", () => {
    it("should return an object with a timestamp and the deleted key", async () => {
      const token = await getToken({ email: editedUser.email, password: editedUser.password });
      const response = await apiCaller(
        "delete",
        config.AUTH_SERVER_PORT,
        "/auth/delete",
        editedUser,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("object");
      chai.expect(response.data).to.have.all.keys("deleted", "timestamp");
    });
  });
});

/* eslint-disable no-undef */
const { expect } = require("chai");
const apiCaller = require("../utils/apiCaller");
const getToken = require("../utils/getToken");

// Testing account
const testUser = {
  firstName: "Test",
  lastName: "User",
  email: `test${Math.floor(Math.random() * 10)}@account.com`,
  password: "test1234",
  confirmPassword: "test1234",
  id: "5cd99f48454aa1341f747f80"
};

// Edited account
const editedUser = {
  firstName: "New",
  lastName: "Test",
  email: "new@edited.com",
  password: "new_test_user",
  confirmPassword: "new_test_user"
};

describe("Auth Service", () => {
  describe("Registration", () => {
    it("should return the user object", async () => {
      const response = await apiCaller("post", "/auth/register", testUser);
      expect(response.status).to.eq(200);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.include.keys(
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
      const response = await apiCaller("post", "/auth/login", testUser);
      expect(response.status).to.eq(200);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.all.keys("success", "timestamp", "token");
    });
  });
  describe("Edit", () => {
    it("should return the edited user as an object", async () => {
      const token = await getToken(testUser);
      const response = await apiCaller("put", "/auth/edit", editedUser, token);
      expect(response.status).to.eq(200);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.all.keys(
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
      const token = await getToken(editedUser);
      const response = await apiCaller("get", "/auth/current", null, token);
      expect(response.status).to.eq(200);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.all.keys(
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
      const token = await getToken(editedUser);
      const response = await apiCaller("delete", "/auth/delete", null, token);
      expect(response.status).to.eq(200);
      expect(response.data).to.be.an("object");
      expect(response.data).to.have.all.keys("deleted", "timestamp");
    });
  });
});

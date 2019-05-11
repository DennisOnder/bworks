/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require("chai");
const config = require("../config/config");
const apiCaller = require("./apiCaller");
const getToken = require("./getToken");

// Testing account
const testUser = {
  email: "test@gmail.com",
  password: "test1234",
};

// Testing board
const testBoard = {
  name: "TestBoard"
};

// Edited account
const editedTestBoard = {
  name: "EditedTestBoard"
};

describe("Board Service", () => {
  describe("Create", () => {
    // it("should return the created board as an object", async () => {
    //   const token = await getToken(testUser);
    //   const response = await apiCaller('post', config.BOARD_SERVER_PORT, '/board/create', testBoard, token);
    //   chai.expect(response.data).to.eq(200);
    // });
  });
  describe("Get", () => {
    it("should return the board as an object", async () => {
      //
    });
  });
  describe("Update board name", () => {
    it("should return the updated board as an object", async () => {
      //
    });
  });
  describe("Update list name", () => {
    it("should return the updated list as an array", async () => {
      //
    });
  });
  describe("Update task", () => {
    it("should return the updated task as an object", async () => {
      //
    });
  });
  describe("Delete task", () => {
    it("should return an object with the deleted and timestamp keys", async () => {
      //
    });
  });
  describe("Delete list", () => {
    it("should return an object with the deleted and timestamp keys", async () => {
      //
    });
  });
  describe("Delete board", () => {
    it("should return an object with the deleted and timestamp keys", async () => {
      //
    });
  });
});

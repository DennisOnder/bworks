/* eslint-disable no-undef */
const chai = require("chai");
const apiCaller = require("../utils/apiCaller");
const getToken = require("../utils/getToken");

// Testing account
const testUser = {
  email: "test@mail.com",
  password: "test1234",
  board: {
    id: "5cdbef69861ed133089a4688"
  }
};

// Testing board
const testBoard = {
  name: `TestBoard${Math.floor(Math.random() * 1000)}`
};

// Edited account
const editedTestBoard = {
  name: "EditedTestBoard"
};

// User token
let token;

beforeEach(async () => {
  token = await getToken(testUser);
});

describe("Board Service", () => {
  describe("Create", () => {
    it("should return the created board as an object", async () => {
      const response = await apiCaller(
        "post",
        "/board/create",
        testBoard,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai
        .expect(response.data)
        .to.have.all.keys("_id", "__v", "owner", "name", "lists", "createdAt");
    });
  });
  describe("Get single board", () => {
    it("should return the board as an object", async () => {
      const response = await apiCaller(
        "get",
        `/board/get/single/${testUser.board.id}`,
        null,
        token
      );
      chai.expect(response.status).to.eq(200);
      chai
        .expect(response.data)
        .to.have.all.keys("_id", "__v", "owner", "name", "lists", "createdAt");
    });
  });
  describe("Get all user boards", () => {
    it("should return the boards as an array", async () => {
      const response = await apiCaller("get", "/board/get/all", null, token);
      chai.expect(response.status).to.eq(200);
      chai.expect(response.data).to.be.an("array");
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

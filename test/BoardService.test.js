/* eslint-disable no-undef */
const chai = require("chai");
const config = require("../config/config");
const apiCaller = require("./apiCaller");

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
    it("should return the created board as an object", async () => {
      //
    });
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

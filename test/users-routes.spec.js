const expect = require("chai").expect;
const supertest = require('supertest');
const app = supertest(require('../app'));
const db = require("../models");

describe("User Routes", () => {
    beforeEach(() => {
        return db.sync().then(() => db.seed());
    });
    it("Gets users", () => {
        return app.get("/users")
                  .expect(200)
                  .then((response) => {
                        expect(response.text).to.contain("moe");
                        expect(response.text).to.contain("larry");
                        expect(response.text).to.contain("curly");
                  });
    });
    it("Posts users takes in name, roleId and redirects to main page", () => {
        return app.post("/users")
                  .send("name=shep&roleId=1")
                  .expect(302);
    });
    it("Posts with userID deletes the user and redirects to main page", () => {
        return app.post("/users/1")
                  .expect(302);
    });
});
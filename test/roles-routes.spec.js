const expect = require("chai").expect;
const supertest = require("supertest");
const app = supertest(require("../app"));
const db = require("../models");

describe("Roles Routes", () => {
    beforeEach(() => {
        return db.sync().then(() => db.seed());
    });
    it("Gets all the roles", () => {
        return app.get("/roles")
                  .expect(200)
                  .then((response) => {
                        expect(response.text).contains("Admin");
                        expect(response.text).contains("HR");
                        expect(response.text).contains("Engineering");
                  });
    });
    it("Posts takes a new role in body and redirects to main roles page", () => {
        return app.post("/roles")
                   .send("role=Development")
                   .expect(302);
    });
    it("Posts with roleId deletes the role and redirects to main page", () => {
        return app.post("/roles/1")
                  .expect(302);
    });
});
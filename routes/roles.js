const db = require("../models");
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res, next) => {
    db.getRoles()
      .then((response) => res.send(response))
      .catch(next);
});

router.post("/", (req, res, next) => {
    db.addRole(req.body.role)
      .then(() => res.redirect("/"))
      .catch(next);
});

router.post("/:id", (req, res, next) => {
    db.deleteRole(req.params.id)
      .then(() => res.redirect("/"))
      .catch(next);
});
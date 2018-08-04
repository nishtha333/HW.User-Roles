const db = require("../models");
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res, next) => {
    db.getUsers()
      .then((response) => res.send(response))
      .catch(next);
});

router.post('/', (req, res, next) => {
    db.addUser(req.body.name, req.body.roleId)
      .then(() => res.redirect("/"))
      .catch(next);
});

router.post('/:id', (req, res, next) => {
    db.deleteUser(req.params.id)
      .then(() => res.redirect("/"))
      .catch(next);
});

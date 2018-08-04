const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
module.exports = app;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/users", require("./routes/users"));
app.use("/roles", require("./routes/roles"));

app.get("/", (req, res, next) => {
    res.redirect("/users");
});

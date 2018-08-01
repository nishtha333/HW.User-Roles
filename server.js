const app = require("app");
const db = require("./models");

const PORT = process.env.PORT || 3000;

db.sync().then(() => db.seed())
         .then(() => app.listen(PORT, () => `Listening on Port ${PORT}`));
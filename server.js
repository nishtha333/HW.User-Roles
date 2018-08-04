const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 3000;

db.sync().then(() => db.seed())
         .then(() => console.log("DB sync'ed and seeded"))
         .then(() => {
             app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
         });
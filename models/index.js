const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

const sync = () => {
    return db.sync({force: true});
}

const seed = () => {
    
}

module.exports = {
    sync, 
    seed
}
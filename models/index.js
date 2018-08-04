const Sequelize = require("sequelize");
const db = new Sequelize(process.env.DATABASE_URL, {logging: false});

const Role = db.define("role", {
    role: {type: Sequelize.STRING, allowNull: false}
});

const User = db.define("user", {
    name: {type: Sequelize.STRING, allowNull: false}
});

Role.hasMany(User);
User.belongsTo(Role);

const sync = () => {
    return db.sync({force: true});
}

const seed = () => {
    const roles = ["Admin", "HR", "Engineering"];
    return Promise.all(roles.map(role => Role.create({role: role})))
                  .then(([admin, hr, engineering]) => {
                        return Promise.all([
                            User.create({name: "moe", roleId: admin.id}),
                            User.create({name: "larry", roleId: admin.id}),
                            User.create({name: "curly", roleId: hr.id}),
                        ]);
                  });
}

const getRoles = () => {
    return Role.findAll({include: [User]});
}

const getUsers = () => {
    return User.findAll({include: [Role]});
}

const addRole = (role) => {
    return Role.create({role: role});
}

const addUser = (name, roleId) => {
    return User.create({name: name, roleId: roleId});
}

const deleteRole = (roleId) => {
    return Role.findOne({where: {id: roleId}})
               .then((role) => role.destroy());
}

const deleteUser = (userId) => {
    return User.findOne({where: {id: userId}})
               .then((user) => user.destroy());
}

module.exports = {
    sync, 
    seed,
    getRoles,
    getUsers,
    addRole,
    addUser,
    deleteRole,
    deleteUser,
    models: {
        User,
        Role
    }
}
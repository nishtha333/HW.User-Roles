const expect = require("chai").expect;
const db = require("../models");
const {Role, User} = db.models;

describe("Models", () => {
    let roleMap = {};
    let userMap = {};
    beforeEach(() => {
        return db.sync().then(() => db.seed())
                        .then(() => db.getRoles())
                        .then((roles) => {
                            roleMap = roles.reduce((memo, input) => {
                                memo[input.role] = input.users;
                                return memo;
                            }, {});
                        })
                        .then(() => db.getUsers())
                        .then((users) => {
                            userMap = users.reduce((memo, input) => {
                                memo[input.name] = input.role.role;
                                return memo;
                            }, {});
                        });
    });
    it('GetRoles gets roles: Moe, Larry are admins, Curly is in HR and noone in Engineering', () => {
        expect(roleMap.Admin.length).to.equal(2);
        expect(roleMap.HR.length).to.equal(1);
        expect(roleMap.Engineering.length).to.equal(0);
        expect(roleMap.Admin[0].name).to.equal("moe");
        expect(roleMap.Admin[1].name).to.equal("larry");
        expect(roleMap.HR[0].name).to.equal("curly");
    });
    it('GetUsers gets users with the roles', () => {
        return db.getUsers()
                 .then((response) => {
                    expect(userMap.moe).to.equal("Admin");
                    expect(userMap.larry).to.equal("Admin");
                    expect(userMap.curly).to.equal("HR");
                 });
    });
    it('addRole adds new role', async () => {
        const newRole = await db.addRole("Development");
        const response = await Role.findOne({where: {id: 4}});
        expect(response.role).to.equal(newRole.role);
    });
    it('addUser adds new user', async () => {
        let role = await Role.findOne({where: {role: "Engineering"}});
        const newUser = await db.addUser("Nish", role.id);
        const response = await User.findOne({where: {id: 4}, include: [Role]});
        expect(response.name).to.equal(newUser.name);
        expect(response.role.role).to.equal("Engineering");
    });
    it('deleteRole deletes a role', async () => {
        await db.deleteRole(1);
        let response = await Role.findOne({where: {id: 1}});
        expect(response).to.be.null;
        response = await db.getRoles();
        expect(response.length).to.be.equal(2);

    });
    it('deleteUser deletes a user', async () => {
        await db.deleteUser(1);
        let response = await User.findOne({where: {id: 1}});
        expect(response).to.be.null;
        response = await db.getUsers();
        expect(response.length).to.be.equal(2);
    })    
});
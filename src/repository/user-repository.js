const { where, Model } = require('sequelize');
const {User, role} = require('../models/index');

class UserRepository{

    async create(data)
    {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }


    async destroy(userId)
    {
        try {
            const user = await User.destroy({
                where:{
                    id: userId
                }
            });
            return user;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getUserByID(userId)
    {
        try {
            const user = await User.findByPk(userId, {
                attributes : ["id", "email"]
            });
            return user;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail)
    {
        try {
            const user = await User.findOne({
                where : {
                    email:userEmail
                }});
            return user;
         } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async isAdmin(userId)
    {
        try {
            const user = await User.findByPk(userId);
            const admin = await role.findOne({
                where :{
                    name : "Admin"
                }
            });
            return user.hasRole(admin);
            
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }

    }


}


module.exports = UserRepository;
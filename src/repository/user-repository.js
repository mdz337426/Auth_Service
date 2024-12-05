const { where, Model } = require('sequelize');
const {User} = require('../models/index');

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
            const user = await User.findByPK(userId, {
                attributes : ["id", "email"]
            });
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }


}


module.exports = UserRepository;
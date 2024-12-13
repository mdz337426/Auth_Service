const { where, Model} = require('sequelize');
const ValidationError = require('../utils/error/validationError')
const {User, role} = require('../models/index');
const ClientError = require('../utils/error/client-error');
const { StatusCodes } = require('http-status-codes');

class UserRepository{

    async create(data)
    {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError")
            {  
                console.log(error.name);
              throw new ValidationError(error);  
            }
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
            if(!user)
            {
                throw new ClientError(
                    "AttributeNotFound",
                    "Invalid email sent in the request",
                    "please check the email, as there is no record of email",
                    StatusCodes.NOT_FOUND
                )
            }
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
const UserRepository = require("../repository/user-repository");
const jwtoken = require('jsonwebtoken')
const {JWT_KEY} = require('../config/configServer')
const bcrypt = require('bcrypt');
const AppError = require("../utils/error-handler");
class UserService{
    constructor()
    {
        this.userRepository = new UserRepository();
    }

    async create(data)
    {
       try {
            const  user = await this.userRepository.create(data);
            return user;
        } catch (error) {

            if(error.name == 'ValidationError')
            {
                throw error;
            }

            throw new AppError(
                "ServerError",
                "Something went wrong in service layer",
                "Logical Issue found",
                500
            );
       }
    }

    async signin(email, plainPassword)
    {
        try {
            //fetch
            const user = await this.userRepository.getByEmail(email);
            //compare password
            const verify = this.checkPassword(plainPassword, user.password);

            if(!verify)
            {
                console.log("password doesn't match");
                throw {error : "incorrect password"}
            }

            const newJWT = this.createtoken({email : user.email, id : user.id});
            return newJWT;

        } catch (error) {
            console.log("somethng went wrong in the signin process");
            throw error;
        }
    }
 
    createtoken(user)
    {
        try {

            const token = jwtoken.sign(user,JWT_KEY, {expiresIn:'2h'});
            return token;
            
        } catch (error) {
            console.log("unable to create token", error);
            throw error;
        }
    }

    verifytoken(token)
    {
        try {
           const response =  jwtoken.verify(token, JWT_KEY);
           return response;         
        } catch (error) {
            console.log("unable to verify token", error);
            throw error;
        }
    }

    async isAuthenticated(token)
    {
       try {
        const response = this.verifytoken(token);
        if(!response)
        {
            throw {err : "token is invalid"};
        }
        const user =await this.userRepository.getUserByID(response.Id);
        if(!user)
        {
            throw {err  : "user no long exist"};
        }
        return user.Id;
       } catch (error) {
            console.log("unable to verify token", error);
            throw error;
       }

    }

    async isAdmin(userId)
    {
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;

        } catch (error) {

            console.log("something went wrong in the service layer");
            throw error;
            
        }
    }
 
    checkPassword(userInputPassword, encryptedPassword)
    {
        try {

            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in password comparison", error);
            throw error;
        }
    } 
}
module.exports = UserService;
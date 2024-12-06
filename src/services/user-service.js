const UserRepository = require("../repository/user-repository");
const jwtoken = require('jsonwebtoken')
const {JWT_KEY} = require('../config/configServer')
const bcrypt = require('bcrypt');
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

            console.log("something went wrong in service layer");
            throw error;
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

    isAuthenticated(token)
    {
       try {
        const response = this.verifytoken(token);
        if(!response)
        {
            throw {err : "token is invalid"};
        }
        const user = this.userRepository.getUserByID(response.Id);
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
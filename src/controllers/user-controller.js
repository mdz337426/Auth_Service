const UserService = require("../services/user-service")

const userService = new UserService();


const create =  async (req , res)=>{
    try {
        
        const response= await userService.create({
            email : req.body.email,
            password : req.body.password
        });


        return res.status(201).json({
            message : "user created successfully",
            success : true,
            data : response,
            err : {}

        })

    } catch (error) {
         console.log(error);
         return res.status(500).json({
            message : "something went wrong",
            data : {},
            success : false,
            err : error
         });
        
    }
}

const signIn = async (req, res)=>{
    try {
        const response = await userService.signin(req.body.email, req.body.password);
        return res.status(201).json({
            message : "successfully logged in ",
            success : true,
            data : response,
            err : {}
        })
    } catch (error) {

        return res.status(500).json({
           message : "something went wrong",
           data : {},
           success : false,
           err : error
        });

        
    }
} 

const isAuthenticated  = async (req, res)=>{
    try {
        const token = req.headers['auth-key'];
        const match =await userService.isAuthenticated(token);

        return res.status(200).json({
            success:true,
            err : {},
            data : match,
            message : 'user is authenticated and token is valid'
        });
         
        
    } catch (error) {
        return res.status(500).json({
            message : "something went wrong",
            data : {},
            success : false,
            err : error
         });
    }
}


module.exports = {
    create,
    signIn,
    isAuthenticated
}
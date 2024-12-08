const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { PORT } = require('./config/configServer')  
const apiRoutes = require('./routes/index')
const bcrypt = require('bcrypt');
const UserService = require('./services/user-service');
const sequelize = require('sequelize')
const {DB_SYNC} = require("./config/configServer")
const db = require('./models/index');
const {User, role} = require('./models/index');


const startserver = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT, async ()=>{
        console.log(`server started on port ${PORT}`); 
        if(DB_SYNC) 
            {
               // db.sequelize.sync({alter:true});
            }

        const u1 = await User.findByPk(4);
        const r1 = await role.findByPk(3);

        u1.addRole(r1);
    });
     
}


startserver();
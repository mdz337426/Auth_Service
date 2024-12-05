const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { PORT } = require('./config/configServer')  
const apiRoutes = require('./routes/index')
const {User} = require('./models/index')
const bcrypt = require('bcrypt');


const startserver = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);
    app.listen(PORT, async ()=>{
        console.log(`server started on port ${PORT}`); 
    });
    
}


startserver();
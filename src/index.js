const express = require('express');
const app = express();
const { PORT } = require('./config/configServer')  


const startserver = ()=>{
    app.listen(PORT, ()=>{
        console.log(`server started on port ${PORT}`);    
    });
    
}


startserver();
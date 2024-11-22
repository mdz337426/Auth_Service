const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();



const startserver = ()=>{
    app.listen(PORT, ()=>{
        console.log(`server started on port ${PORT}`);    
    });
    
}


startserver();
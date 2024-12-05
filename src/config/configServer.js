const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT : process.env.PORT,
    signature: process.env.SIGNATURE
}
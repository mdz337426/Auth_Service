const {StatusCodes} = require('http-status-codes');
const { Model } = require('sequelize');

class AppError extends Error{
    constructor(name = "AppError",
        message = "something went wrong",
        explanation = "something went wrong",
        statusCode =StatusCodes.INTERNAL_SERVER_ERROR
    )
    {
        super();
        this.message = message;
        this.name = name;
        this.explanation = explanation;
        this.statusCode  = statusCode;
    }
}

module.exports = AppError;
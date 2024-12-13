const { StatusCodes } = require('http-status-codes');
const AppError = require('./error-handler');



class ValidationError extends AppError{
    constructor(error)
    {
        let explanation = [];
        error.errors.forEach(elm => {
            explanation.push(elm.message);
        });
        error.name = "ValidationError";
        super(
            error.name,
            'Not able to validate the data in the request',
            explanation,
            StatusCodes.BAD_REQUEST,
        );

    }
}


module.exports = ValidationError;
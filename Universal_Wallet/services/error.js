export class ErrorService {

    constructor (commonType, description, isOperational) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.commonType = commonType;
        this.description = description;
        this.isOperational = isOperational;
    }

    handleResponse = ({
        res, statusCode = 200, msg = 'Success', data = {}, result = 1,
    }) => {
        res.status(statusCode).send({ result, msg, data });
    };

    handleError = ({
        res, statusCode = 500, err = 'error', result = 0, data = {}
    }) => {
        res.status(statusCode).send({
          result,
          msg: err instanceof Error ? err.message : (err.msg || err),
          data
        });
    };



}
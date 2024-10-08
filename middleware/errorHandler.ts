import { ErrorRequestHandler } from 'express';
import logEvents from './logEvents';

const errorHandler: ErrorRequestHandler = (err,_req,res,_next) => {
	logEvents(`error name: ${err.name}\t error message: ${err.message}`,'errLog');
	res.status(500).send(err.message);
}

export default errorHandler;
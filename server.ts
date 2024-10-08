import path from 'path';
import express from 'express';
import logEvents from './middleware/logEvents';
import cors, { CorsOptions } from 'cors';
import errorHandler from './middleware/errorHandler';
import {IncomingHttpHeaders} from 'http';
import subdirRouter from './routes/subdir';
import { routes } from './routes/routes';
import rootRouter from './routes/root';

const PORT=8080;
const app = express();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((req,res,next)=>{
	logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`,'reqLog');
	next();
});

const whitelistedURLs = new Set([undefined, '']);
const corsOptions: CorsOptions = {
	origin: (origin,callback)=>{
		if(whitelistedURLs.has(origin)){
			callback(null,true);
		} else {
			callback(new Error('not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
// NOTICE how we didnt have to call next() for the built-in middlewares 
// parse form data
app.use(express.urlencoded({extended: false}));
//parse json
app.use(express.json());
//allow public access to the public folder
app.use('/',express.static(path.join(__dirname,'public')));
app.use(routes.subdir,express.static(path.join(__dirname,'public')));

app.use(routes.subdir, subdirRouter);
app.use('/', rootRouter);

app.all('/*', (req, res)=>{
	if(req.accepts("html")) {
		const filePath=path.join(__dirname,'views','404.html');
		res.status(404).sendFile(filePath);
	} else if(req.accepts("json")) {
		res.status(404).json({error: "not found"});
	} else { 
		res.type('txt').send("not found");
	}
});

app.use(errorHandler);
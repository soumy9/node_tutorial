import { Router } from "express";
import path from 'path';

const router=Router();

router.get('/', (req, res)=>{
	console.log(req.url);

	const filePath=path.join(__dirname,'..','views','index.html');
	res.sendFile(filePath);
});

router.get('/new-page.html', (req,res,next)=>{
	//res.send('Hello');
	//console.log(req.headers);
	console.log(req.get('Content-Type'));
	next();
}, (req, res)=>{
	const filePath=path.join(__dirname,'..','views','new-page.html');
	res.sendFile(filePath);
});

export default router;
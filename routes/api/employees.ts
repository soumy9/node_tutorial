import { Router } from "express";
import {readFileSync} from 'fs';
import path from 'path';

const employeesData = JSON.parse(readFileSync(path.join(__dirname, '..', '..', 'data', 'data.json')).toString());
console.log(employeesData);
const router = Router();

router.route('/')
	.get((req, res)=>{
		res.json(employeesData);
	})
	.post((req,res)=>{
		console.log(req.body);
		
		res.json({firstName: req.body.firstName, lastName: req.body.lastName});
	})
	.put()
	.delete();

router.route('/:id')
	.get((req,res)=>{
		const employeeData=employeesData.find((employee)=>employee.id===parseInt(req.params.id));
		res.json({employeeData});
	});

	export default router;
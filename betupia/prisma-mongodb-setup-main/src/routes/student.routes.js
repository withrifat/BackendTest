import express from "express"
import { addStudent, student } from "../controller/student.controller.js";



const router = express.Router();


router.get('/students', student);
router.post('/students', addStudent);


export default router;
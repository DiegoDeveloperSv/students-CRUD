import { Router } from "express"; 
export const router = Router();
import { studentsController } from '../controllers/students.js';

router.get("/", studentsController.getAll);
router.post("/", studentsController.create);
router.delete("/:id", studentsController.deleteStudent);
router.put("/:id", studentsController.update);
router.get("/:id", studentsController.getById);

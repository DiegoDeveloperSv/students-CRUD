import { modelStudents } from '../models/students.js';
import { partialStudentSchema, validateStudent } from '../zod.js';


export class studentsController{
  static getAll = (req, res)=>{
    const {materia} = req.query;
    const students = modelStudents.getAll();

    if(materia){
      const studentsBySubject = modelStudents.searchBySubject(materia);
      if(studentsBySubject.length === 0){
        return res.status(404).json('no students found');
      }
      return res.json(studentsBySubject);
    }
    res.json(students);
  }

  static create = (req, res)=>{
    const result = validateStudent(req.body);
    if (result.error){
      return res.status(400).json({error: JSON.parse(result.error.message)});
    }

    const newStudent = modelStudents.create({data: result.data});
    res.json('added successfully', newStudent);
  }

  static deleteStudent = (req, res)=>{
    const {id}  = req.params;
    const student = modelStudents.deleteStudent(id);
    if(student != null){
      res.json('deleted successfully');
    }else{
      res.status(404).json('student not found');
    }
  }

  static update = (req, res)=>{
    const {id} = req.params;
    const result = partialStudentSchema(req.body);

    if (result.error){
      return res.status(400).json({error: result.error});
    }

    const modifiedStudent = modelStudents.modified({id, data:result.data});

    if(modifiedStudent != null){
      res.json('modified successfully');
    }else{
      res.status(404).json('student not found');
    }
  }

  static getById = (req, res)=>{
    const {id} = req.params;
    const student = modelStudents.searchById({id});

    if(student != null){
      res.json(student);
    }else{
      res.status(404).json('student not found');
    }
  }
}
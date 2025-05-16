import zod from 'zod';

const studentSchema = zod.object({
  nombre: zod.string().min(3).max(20),
  edad: zod.number().int().positive().min(6).max(20),
  materias : zod.array(zod.enum(['matematicas', 'programacion', 'ingles', 'historia', 'geografia'])).min(1).max(5),
});

export function validateStudent(object){
  return studentSchema.safeParse(object);
}

export function partialStudentSchema(object){
  return studentSchema.partial().safeParse(object);
}
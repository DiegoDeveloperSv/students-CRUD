import fs from 'fs';
const students = JSON.parse(fs.readFileSync('./students.json', 'utf-8'));

function save(object){
  fs.writeFileSync('./students.json', JSON.stringify(object, null, 2));
}

export class modelStudents{
  static getAll(){
    return students;
  }

  static create({data}){

    const index = students.at(-1);
    let identity = 0;
    if (index != undefined){
      identity = index.id + 1;
    }else{
      identity = 1;
    }


    const newStudent = {
      id: identity,
      ...data
    };
    students.push(newStudent);
    save(students);
    return newStudent;
  }

  static deleteStudent(id){
    const index = students.findIndex(student => student.id == id);
    if (index != -1){
      const deleted = students[index];
      students.splice(index, 1);
      save(students);
      return deleted;
    }else{
      return null;
    }
  }

  static modified({id, data}){
    let index = students.findIndex(student => student.id === parseInt(id));

    if (index != -1){
      const modifiedStudent = {
        ...students[index],
        ...data
      };
      students[index] = modifiedStudent;
      save(students);
      return modifiedStudent;
    }else{
      return null;
    }
  }

  static searchBySubject(subject){
    const studentsBySubject = students.filter(student => student.materias.includes(subject));
    return studentsBySubject;
  }

  static searchById({id}){
    const student = students.find(st => st.id == parseInt(id));
    if(student){
      return student;
    }else{
      return null;
    }
  }
}
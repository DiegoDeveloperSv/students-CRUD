const getAll = async () => {
  const response = await fetch('http://localhost:3000/students');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  data.forEach((student) =>{
    createStudent(student.id, student.nombre, student.edad, student.materias);
  })
}

getAll();

function createStudent(id, name, age, subjects) {
  const stc = document.createElement('div');
  const i = document.createElement('div');
  const n = document.createElement('div');
  const a = document.createElement('div');
  const sd = document.createElement('div');
  const s = document.createElement('select');
  const elBtn = document.createElement('button');
  const up = document.createElement('button');
  const eliminar = document.createElement('div');
  const update = document.createElement('div');

  stc.classList.add('stc');
  i.classList.add('id');
  n.classList.add('nombre');
  a.classList.add('edad');
  sd.classList.add('select');
  s.classList.add('materias');
  elBtn.classList.add('elBtn');
  eliminar.classList.add('eliminar');
  update.classList.add('update');
  up.classList.add('upBtn');

  i.textContent = id;
  n.textContent = name;
  a.textContent = age;
  elBtn.textContent = 'X';
  up.textContent = 'U';

  subjects.forEach((subject) => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    s.appendChild(option);
  })

  sd.appendChild(s);

  elBtn.addEventListener('click', () => {
    stc.remove();
    fetch(`http://localhost:3000/students/${id}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then(data => alert(data))
    .catch((error) => console.error('Error:', error));
  });

  up.addEventListener('click', () => {
    document.querySelector('.form-page').style.display = 'flex';
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('student-id').value = id;
  });

  eliminar.appendChild(elBtn);
  update.appendChild(up);

  stc.appendChild(i);
  stc.appendChild(n);
  stc.appendChild(a);
  stc.appendChild(sd);
  stc.appendChild(update);
  stc.appendChild(eliminar);

  document.querySelector('.students').appendChild(stc);
}

// update section

document.getElementById('close').addEventListener('click', () => {
  document.querySelector('.form-page').style.display = 'none';
});

let subjects = [];

document.getElementById("matematicas").addEventListener("click",(e)=>{
  e.preventDefault();
  subjects.push("matematicas");
  console.log(subjects);
  e.target.style.display = "none";
  elegidas();
});

document.getElementById("ingles").addEventListener("click",(e)=>{
  e.preventDefault();
  subjects.push("ingles");
  console.log(subjects)
  e.target.style.display = "none";
  elegidas()
});

document.getElementById("programacion").addEventListener("click",(e)=>{
  e.preventDefault();
  subjects.push("programacion");
  console.log(subjects)
  e.target.style.display = "none";
  elegidas();
});     

document.getElementById("historia").addEventListener("click",(e)=>{
  e.preventDefault();
  subjects.push("historia");
  console.log(subjects)
  e.target.style.display = "none";
  elegidas();
});

document.getElementById("geografia").addEventListener("click",(e)=>{
  e.preventDefault();
  subjects.push("geografia");
  console.log(subjects)
  e.target.style.display = "none";
  elegidas();
});

function elegidas(){
  let subjectsElegidas = document.querySelector(".elegidas");
  subjectsElegidas.style.display = "block";
  subjectsElegidas.innerHTML = "SELECTED SUBJECTS: ";
  for (let i = 0; i < subjects.length; i++) {
    let li = document.createElement("li");
    li.innerText = subjects[i];
    subjectsElegidas.appendChild(li);
  }
}

document.getElementById('modificar').addEventListener('click', (e) => {
  e.preventDefault();
  const id = document.getElementById('student-id').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  if(name === "" || age === "" || subjects.length === 0){
    alert("Por favor, completa todos los campos.");
  }else{
    fetch(`http://localhost:3000/students/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: name,
      edad: parseInt(age),
      materias: subjects
    })
    })
    .then((response) => response.json())
    .then(data => {
      alert(data);
      document.querySelector('.form-page').style.display = 'none';
      document.querySelector('.students').innerHTML = '';
      getAll();
      subjects = [];
    })
    .catch((error) => console.error('Error:', error));
  }
});
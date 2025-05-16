
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

document.getElementById("enviar").addEventListener("click",(e)=>{
  const nombre = document.getElementById("name").value;
  const edad = document.getElementById("age").value;

  if(nombre === "" || edad === "" || subjects.length === 0){
    alert("Por favor, completa todos los campos.");
  }else{
    e.preventDefault();
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        edad: parseInt(edad),
        materias: subjects
      })
    }).then(res=>res.json())
    .then(res=>{
      alert(res);
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("matematicas").style.display = "flex";
      document.getElementById("ingles").style.display = "flex"; 
      document.getElementById("programacion").style.display = "flex";
      document.getElementById("historia").style.display = "flex";
      document.getElementById("geografia").style.display = "flex";
      subjects = [];
      let subjectsElegidas = document.querySelector(".elegidas");
      subjectsElegidas.style.display = "none";

    })
    .catch(err=>console.log(err));
  }
})
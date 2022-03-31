function login(){

let user;
let pass;

user = document.getElementById("usuario").value;
pass = document.getElementById("contrasena").value;

if(user == "Roberto" && pass == "1234" || user == "Carlos" && pass == "1234"){
    localStorage.setItem("user", user);
    window.location= "calcula.html";
}else{
    document.getElementById("error").innerHTML = "Usuario no Registrado" 
}

}
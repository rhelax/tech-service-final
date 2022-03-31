let dineroR = parseInt(500000);
let dineroC = parseInt(750000);
let user = localStorage.getItem("user");
if(user == "Carlos"){
    localStorage.setItem("dineroC", dineroC);
    document.getElementById("ussr").innerHTML = "Usuario: " + user;
    document.getElementById("money").innerHTML = "Dinero: " + dineroC;
}
if(user == "Roberto"){
    localStorage.setItem("dineroC", dineroR);
    document.getElementById("ussr").innerHTML = "Usuario: " + user;
    document.getElementById("money").innerHTML = "Dinero: " + dineroR;
}

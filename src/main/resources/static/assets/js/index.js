const getNombre = () => {
    return localStorage.getItem("userName");
}

const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

localStorage.setItem("hayLogin", false);

const setNombreUsuario = () => {
    if(localStorage.getItem("hayLogin") == true){
        setNombre(getNombre());
    } else {
        setNombre("login/registro");
        console.log("hola");
    }
}
//////////////////////////////////////////////////////////
setNombreUsuario();

//falta forma de que cada vez que pase por index.js no se ponga hayLogin = false, solo al iniciar la aplicación

const getOfertas = (boton) => {
    if(localStorage.getItem("hayLogin") == true){
        document.getElementById(boton).href = "./search.html";
    } else {
        alert("Es necesario registrarse antes de acceder al buscador")
        document.getElementById(boton).href = "./login.html";
    }
}
$('#buscadorOfertas').click(() => getOfertas("buscadorOfertas"));
$('#navOfertas').click(() => getOfertas("navOfertas"));
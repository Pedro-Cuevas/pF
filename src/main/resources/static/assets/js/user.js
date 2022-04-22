const getNombre = () => {
    return localStorage.getItem("userName");
}
const getApellido = () => {
    return localStorage.getItem("userSurname");
}
const getEmail = () => {
    return localStorage.getItem("userEmail");
}
const getEstudios = () => {
    return localStorage.getItem("userStudies");
}


const setNombre = (nombre, apellido) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
    document.getElementById("nombreUsuario").innerHTML = nombre +" "+ apellido;
}

const setEmail = (email) => {
    document.getElementById("email").innerHTML = email;
}
const setEstudios = (estudios) => {
    document.getElementById("studies").innerHTML = estudios;
}

setNombre(getNombre(), getApellido());
setEmail(getEmail());
setEstudios(getEstudios());


//falta poder obtener la variable de login.js
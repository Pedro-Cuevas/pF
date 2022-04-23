const getNombre = () => {
    return localStorage.getItem("userName");
}

const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

setNombre(getNombre());

//no funciona todavía
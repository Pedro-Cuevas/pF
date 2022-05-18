$('#gestorOfertas').click(() => window.location="./admin.html");

//////////////////////////////////////////////////////////////////////
const noLogin = async (id) => {

    let request2 = await fetch("/api/v1/logout",{
        method : 'POST'
    });
    if(request2.ok){
    }
        
}

/////////////////////////////////////////////////////////////////////

const getNombreUsuario = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        setUser(res);
    }
}

const setUser = async (nombre) => {
    let request = await fetch("/api/v1/users", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        
        res.forEach(obj =>{
            if(obj.userName == nombre){
                setNombre(obj.userName, obj.userEmail);
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
            }
        });
    }
}

//////////////////////////////////////////////////////////////////////
const setNombre = (nombre, email) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
    document.getElementById("nombreUsuario").innerHTML = nombre;
    document.getElementById("email").innerHTML = email;
}

//////////////////////////////////////////////////////////////////////////
const getID = async (email) => {
    let request = await fetch("/api/v1/users", {
        method: 'GET',
    });
    let id;
    if(request.ok) {
        let res = await request.json();
        res.forEach(obj => {
            if(obj.userEmail == email){
                id = obj.id;
            }
        });
        return id;
    }
}

const getId = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).id;
}

//////////////////////////////////////////////////////////////////////
getNombreUsuario();
$("#cerrarSesion").click(() => noLogin(getId()));
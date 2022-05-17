$('#gestorOfertas').click(() => window.location="./admin.html");

//////////////////////////////////////////////////////////////////////
const noLogin = async (id) => {
    /*let txt_body = '{ "id": "'
        + id
        + '", "userId": "'
        + id
        + '", "isLogged": "'
        + 0
        + '"}';

    let request = await fetch("/api/v1/login/" + id, {
        body: txt_body,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    localStorage.setItem("hayLogin", false);
    if(request.ok) {*/
        let request2 = await fetch("/api/v1/logout",{
            method : 'POST'
        });
        if(request2.ok){
            console.log("sesión cerrada");
        }
        
    //}
}

/////////////////////////////////////////////////////////////////////

const getNombreUsuario = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        console.log(res);
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
                /*let txt_body = '{ "id": "'
                    + obj.id
                    + '", "userId": "'
                    + obj.id
                    + '", "isLogged": "'
                    + 1
                    + '"}';*/
                setNombre(obj.userName, obj.userEmail);
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
                //localStorage.setItem("hayLogin", true);
                //setLogin(obj.id, txt_body);
            }
        });
    }
}

/*const setLogin = async (id, txt_body) => {
    console.log(id);
    let request2 = await fetch("/api/v1/login/" + id, {
        body: txt_body,
        method: 'PUT',
        //body: txt_body,
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request2.ok) {
        console.log("Bienvenido");
    }
}*/
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
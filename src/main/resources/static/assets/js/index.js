//const getNombre = () => {
//    return localStorage.getItem("userName");
//}

const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

/*
const setNombreUsuario = () => {
    if(localStorage.getItem("hayLogin") == true){
        setNombre(getNombre());
    } else {
        setNombre("login/registro");
        console.log("hola");
    }
}
*/

//////////////////////////////////////////////////////////////////////////////////////
const getLogin = async () => {
    let request = await fetch("/api/v1/login/logged", {
        method: 'GET',
    });

    localStorage.setItem("hayLogin", false);
    if(request.ok) {
        //console.log(request);
        let obj = await request.json();
        //console.log(obj);
        if(obj != null){
            localStorage.setItem("hayLogin", true);
            let request2 = await fetch("/api/v1/users/"+obj.userId, {
                method: 'GET',
            });
            if(request2.ok){
                let user = await request2.json();
                localStorage.setItem("userLoggedIn", user);
                setNombre(user.userName);
            }
        }
    }
}

//////////////////////////////////////////////////////////

const getOfertas = (boton) => {
    let login = localStorage.getItem("hayLogin");
    console.log(login);
    if(login == true){
        //document.getElementById(boton).href = "./search.html";
        console.log(login);
    } else {
        console.log("hola");
        //alert("Es necesario registrarse antes de acceder al buscador")
        //document.getElementById(boton).href = "./login.html";
    }
}

getLogin();
$('#buscadorOfertas').click(() => getOfertas("buscadorOfertas"));
$('#navOfertas').click(() => getOfertas("navOfertas"));

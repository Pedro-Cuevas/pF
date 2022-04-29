const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

//////////////////////////////////////////////////////////////////////////////////////
const getLogin = async () => {
    let request = await fetch("/api/v1/login/logged", {
        method: 'GET',
    });

    localStorage.setItem("hayLogin", false);
    if(request.ok) {
        let obj = await request.json();
        //esto da error cuando no hay ningún usuario logged in
        if(obj != null){
            localStorage.setItem("hayLogin", true);
            let request2 = await fetch("/api/v1/users/"+obj.userId, {
                method: 'GET',
            });
            if(request2.ok){
                let user = await request2.json();
                //localStorage.setItem("userLoggedIn", user);
                setNombre(user.userName);
            }
        }
    }
}

//////////////////////////////////////////////////////////

const getOfertas = (boton) => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById(boton).href = "./search.html";
    } else {
        alert("Es necesario registrarse antes de acceder al buscador")
        document.getElementById(boton).href = "./login.html";
    }
}
//////////////////////////////////////////////////////////
const direccionLink = () => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById("nombreLogin").href = "./user.html";
    } else {
        document.getElementById("nombreLogin").href = "./login.html";
    }
}

getLogin();
$('#buscadorOfertas').click(() => getOfertas("buscadorOfertas"));
$('#navOfertas').click(() => getOfertas("navOfertas"));
$('#nombreLogin').click(() => direccionLink());
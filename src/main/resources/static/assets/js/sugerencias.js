const createSugerencia = async () => {

    let txt_body = '{ "sugerenciaMail": "'
    + $('#email').val()
    + '", "sugerenciaText": "'
    + $('#inputSugerencia').val()
    + '"}';

    let request = await fetch("/api/v1/sugerencias", {
        body: txt_body,
        method: 'POST',
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {
        console.log(txt_body);
        $('#modal').modal('show');
    }
}

$('#btnSend').click(() => createSugerencia());
$('#btnClose1').click(() => $('#modal').modal('hide'));
$('#btnClose2').click(() => $('#modal').modal('hide'));

///////////////////////////////////////////////////////////
const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

//////////////////////////////////////////////////////////////////////////////////////
const getLogin = async () => {
    let request = await fetch("/api/v1/login/logged", {
        method: 'GET',
    });

    if(request.ok) {
        texto = await request.text();
        if(texto == ""){
            console.log("no hay login");
        } else {
            console.log("hay login");
            let obj = JSON.parse(texto);
            localStorage.setItem("hayLogin", true);
            let request2 = await fetch("/api/v1/users/"+obj.userId, {
                method: 'GET',
            });
            if(request2.ok){
                let user = await request2.json();
                localStorage.setItem("userLoggedIn", JSON.stringify(user));
                setNombre(user.userName);
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////
const direccionLink = () => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById("nombreLogin").href = "./user.html";
    } else {
        document.getElementById("nombreLogin").href = "./login.html";
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

getLogin();
$('#nombreLogin').click(() => direccionLink());
$('#navOfertas').click(() => getOfertas("navOfertas"));
const createSugerencia = async () => {

    let txt_body = '{ "newsletterMail": "'
    + $('#email').val()
    + '", "name": "'
    + $('#inputNombre').val()
    + '", "gender": "'
    + $('#genero').val()
    + '"}';

    let request = await fetch("/api/v1/newsletters", {
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
                let txt_body = '{ "id": "'
                    + obj.id
                    + '", "userId": "'
                    + obj.id
                    + '", "isLogged": "'
                    + 1
                    + '"}';
                setNombre(nombre);
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
                localStorage.setItem("hayLogin", true);
                setLogin(obj.id, txt_body);
            }
        });
    }
}

const setLogin = async (id, txt_body) => {
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
}

//////////////////////////////////////////////////////////////////////
getNombreUsuario();

$('#nombreLogin').click(() => direccionLink());
$('#navOfertas').click(() => getOfertas("navOfertas"));
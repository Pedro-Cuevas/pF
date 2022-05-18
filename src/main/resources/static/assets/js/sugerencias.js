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
        $('#modal').modal('show');
    }
}

$('#btnSend').click(() => createSugerencia());
$('#btnClose1').click(() => $('#modal').modal('hide'));
$('#btnClose2').click(() => $('#modal').modal('hide'));


const setId = async (nombre) => {
    let request = await fetch("/api/v1/users", {
        method: 'GET',
    });

    if(request.ok){
        let res = await request.json();
        res.forEach(obj => {
            if(obj.userName == nombre){
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
            }
        });
    }
}

const setNombre = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        setId(res);
        if(res == "Admin"){
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./perfilAdmin.html";
        } else {
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./user.html";
        }
    }   
}

setNombre();

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
const setNombre = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        console.log(res);
        if(res == "anonymousUser"){
            document.getElementById("nombreLogin").innerHTML = "Registro";
            document.getElementById("nombreLogin").href = "./register.html";
        } else if(res == "Admin"){
            console.log("Admin");
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./perfilAdmin.html";
        } else {
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./user.html";
        }
    }   
}

setNombre();

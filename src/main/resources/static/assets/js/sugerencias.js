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
                localStorage.setItem("userLoggedIn", JSON.stringify(user));
                setNombre(user.userName);
            }
        }
    }
}


getLogin();
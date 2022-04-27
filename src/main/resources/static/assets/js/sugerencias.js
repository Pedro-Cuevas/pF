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
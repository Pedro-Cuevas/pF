const createUser = async () => {

    let txt_body = '{ "userName": "'
        + $('#name').val()
        + '", "userSurname": "'
        + $('#surname').val()
        + '", "userStudies": "'
        + $('#resume').val()
        + '", "userEmail": "'
        + $('#email').val()
        + '", "userPassword": "'
        + $('#password').val()
        + '"}';

    let request = await fetch("/api/v1/users", {
        body: txt_body,
        method: 'POST',
        body: txt_body,
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {
        console.log("oferta creada");
        localStorage.setItem("userName", $('#name').val());
        localStorage.setItem("userSurname", $('#surname').val());
        localStorage.setItem("userEmail", $('#email').val());
        localStorage.setItem("userStudies", $('#resume').val());
        localStorage.setItem("hayLogin", true);
        //window.location ="./user.html";
    }
}

$('#btnCrear').click(() => createUser());
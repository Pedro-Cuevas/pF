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
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {
        res = await request.json();
        console.log("oferta creada");
        localStorage.setItem("userLoggedIn", JSON.stringify(res));
        localStorage.setItem("hayLogin", true);
        let login = '{ "userId": "'
            + res.id
            + '", "isLogged": "'
            + 1
            + '"}';
        
        
        let request2 = await fetch("/api/v1/login", {
            body: login,
            method: 'POST',
            headers: {
                "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
            },
            dataType: "json",
        });

        if(request2.ok) {
            window.location ="./user.html";
        }
        
        
    }
}

$('#btnCrear').click(() => createUser());

if(document.getElementById("btnCrear") != null){
    document.getElementById("btnCrear").addEventListener("click", function(event){
        event.preventDefault()
    });
}
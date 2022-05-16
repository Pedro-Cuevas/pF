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

$('#btnCrear').click(() => validateForm());

if(document.getElementById("btnCrear") != null){
    document.getElementById("btnCrear").addEventListener("click", function(event){
        event.preventDefault()
    });
}
//////////////////////////////////////////////////////////////
const validateForm = async () =>{
    
    let nombre = document.getElementById("name").value;
    let apellido = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let estudios = document.getElementById("resume").value;
    let password = document.getElementById("password").value;
    let rpassword = document.getElementById("rpassword").value;
    let cv = document.getElementById("cv").value;

    expresion = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;


    if (nombre == ""){
        alert("Nombre requerido");
        document.getElementById("name").focus();
        return false;
    } else if (nombre.length > 20) {
        alert("El nombre debe tener menos de 15 caracteres.");
        document.getElementById("name").focus();
        return false;
    } else if (nombre.length < 2) {
        alert("El nombre debe tener más de 2 caracteres.");
        document.getElementById("name").focus();
        return false;
    } 
    
    else if (apellido == ""){
        alert("Apellido requerido");
        document.getElementById("surname").focus();
        return false;
    } else if (apellido.length > 20) {
        alert("El apellido debe tener menos de 20 caracteres.");
        document.getElementById("surname").focus();
        return false;
    } else if (apellido.length < 2) {
        alert("El apellido debe tener más de 2 caracteres.");
        document.getElementById("surname").focus();
        return false;
    } 
    
    else if (email == ""){
        alert("Email requerido");
        document.getElementById("email").focus();
        return false;
    } else if (!expresion.test(email)) {
        alert("El formato del email es incorrecto.");
        document.getElementById("email").value = "";
        document.getElementById("email").focus();
        return false;
    } 
    
    else if (estudios == ""){
        alert("Estudios requeridos");
        document.getElementById("resume").focus();
        return false;
    } else if (estudios.length < 3) {
        alert("Los estudios deben tener más de 2 caracteres.");
        document.getElementById("resume").focus();
        return false;
    } else if (estudios.length > 200) {
        alert("Los estudios deben de tener menos de 200 caracteres.");
        document.getElementById("resume").focus();
        return false;
    }

    else if (cv == ""){
        alert("Es necesario introducir un CV");
        document.getElementById("cv").focus();
        return false;
    }

    else if (password == ""){
        alert("Contraseña requerida");
        document.getElementById("password").focus();
        return false;
    } else if (password.length < 5) {
        alert("La contraseña debe tener más de 5 caracteres.");
        document.getElementById("password").focus();
        return false;
    } else if (password.length > 20) {
        alert("La contraseña debe tener menos de 20 caracteres.");
        document.getElementById("password").focus();
        return false;
    }

    else if (rpassword == ""){
        alert("Es necesario repetir contraseña");
        document.getElementById("rpassword").focus();
        return false;
    } else if (rpassword != password) {
        alert("Las contraseñas deben coincidir");
        document.getElementById("rpassword").focus();
        return false;
    }

    else{
        await createUser();
    }
}

//////////////////////////////////////////////////////////

const getOfertas = (boton) => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById(boton).href = "./search.html";
    } else {
        alert("Es necesario registrarse antes de acceder al buscador")
        document.getElementById(boton).href = "./register.html";
    }
}

//$('#navOfertas').click(() => getOfertas("navOfertas"));
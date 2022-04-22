//let nombreUsuario = "hola";

const getUsers = async () => {
    let userEmail = $('#email').val();
    console.log(userEmail);
    if(userEmail == ""){
        let request = await fetch("/api/v1/users" , {
            method: 'GET',
        });
    
        if(request.ok) {
            let res = await request.json();
            console.log(res);
        }
    } else {
        let request = await fetch("/api/v1/users/?userEmail=" + userEmail, {
            method: 'GET',
        });
    
        if(request.ok) {
            let res = await request.json();
            setNombre(res[0].userName);

            //top.nombre = res[0].userName;
            //top.nombre = "hola";
            window.location ="./user.html";
            /*exists = false;
            let id = $('#email').val();
            res.forEach(obj => {
                if(id == obj.id){
                    exists = true;
                };
            });
            
            if(exists == false){
                alert("Este usuario no está registrado");
            } else {
                alert("Este usuario está registrado");
            }*/
    
        }
    }

}

$('#btnLogin').click(() => getUsers());

// Prevent a link from opening the URL
if(document.getElementById("btnLogin") != null){
    document.getElementById("btnLogin").addEventListener("click", function(event){
        event.preventDefault()
    });
}

/*
const setNombre = (nombre) => {
    nombreUsuario = nombre;
}

const getNombre = () => {
    return nombreUsuario;
}*/


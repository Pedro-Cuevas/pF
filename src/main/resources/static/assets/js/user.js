/*const getId = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).id;
}
const getNombre = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).userName;
}
const getApellido = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).userSurname;
}
const getEmail = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).userEmail;
}
const getEstudios = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).userStudies;
}*/

const getId = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).id;
}
//////////////////////////////////////////////////////////////////////////

const setNombre = (nombre, apellido, email, estudios) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
    document.getElementById("nombreUsuario").innerHTML = nombre +" "+ apellido;
    document.getElementById("email").innerHTML = email;
    document.getElementById("studies").innerHTML = estudios;
}


//////////////////////////////////////////////////////////////////////////
const getID = async (email) => {
    let request = await fetch("/api/v1/users", {
        method: 'GET',
    });
    let id;
    if(request.ok) {
        let res = await request.json();
        res.forEach(obj => {
            if(obj.userEmail == email){
                id = obj.id;
            }
        });
        //console.log(id);
        return id;
    }
}

//////////////////////////////////////////////////////////////////////
const getOffersAndDisplay = async () => {
    let id = await  getId();
    let request = await fetch("/api/v1/offers/with-application/"+id, {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();

        let text = '<ul class="list-group">';
        res.forEach(obj => {
            text += '<li class="list-group-item">'
            +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
            + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-secondary"'
            + ' id="' + obj.id
            + 'noSave_btn">No guardar</button></div> </li> <br>';
        });
        text += '</ul>';
        document.getElementById("tab2").innerHTML=text;


        res.forEach(obj => {
            $('#' + obj.id + 'noSave_btn').click(() => editApplication(id, obj.id));
        });
    }
}

const editApplication = async (user_id, offer_id) => {
    let request = await fetch("/api/v1/applications", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        res.forEach(obj => {
            if(obj.offerId == offer_id && obj.userId == user_id){
                deleteApplication(obj.id);
            }
        });

    }
}

const deleteApplication = async (id) => {
    let request = await fetch("/api/v1/applications/"+id, {
        method: 'DELETE',
    });

    if(request.ok){
        getOffersAndDisplay();
    }
}

//////////////////////////////////////////////////////////////////////
const noLogin = async (id) => {
    /*let txt_body = '{ "id": "'
        + id
        + '", "userId": "'
        + id
        + '", "isLogged": "'
        + 0
        + '"}';

    let request = await fetch("/api/v1/login/" + id, {
        body: txt_body,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {*/
        let request2 = await fetch("/api/v1/logout",{
            method : 'POST'
        });
        if(request2.ok){
            console.log("sesión cerrada");
        }
        
    //}
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
                /*let txt_body = '{ "id": "'
                    + obj.id
                    + '", "userId": "'
                    + obj.id
                    + '", "isLogged": "'
                    + 1
                    + '"}';*/
                setNombre(obj.userName, obj.userSurname, obj.userEmail, obj.userStudies);
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
                //localStorage.setItem("hayLogin", true);
                //setLogin(obj.id, txt_body);
            }
        });
    }
}

/*const setLogin = async (id, txt_body) => {
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
}*/

//Checks if user is not admin in order to direct to page
const begin = async () => {
    let user = JSON.parse(localStorage.getItem("userLoggedIn"));
    let isAdmin = true;
    let requestUsers = await fetch("/api/v1/users", {
        method: 'GET',
    });

    if(requestUsers.ok) {
        let userList = await requestUsers.json();

        userList.forEach(obj => {
            if((obj.userName ===  user.userName)&&(obj.role != "ROLE_ADMIN")){
                isAdmin = false;
            } else if ((obj.userName ===  user.userName)&&(obj.role == "ROLE_ADMIN")) {
                isAdmin = true;
            }
        });
    }    

    if(isAdmin){
        window.location.href = '/perfilAdmin.html';
    } else {
        window.location.href = '/user.html';
    }
}

begin();



//////////////////////////////////////////////////////////////////////
getNombreUsuario();
//setNombre(getNombre(), getApellido());
//setEmail(getEmail());
//setEstudios(getEstudios());
$("#btnTab2").click(() => getOffersAndDisplay())
$("#cerrarSesion").click(() => noLogin(getId()));



const getId = () => {
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
}
//////////////////////////////////////////////////////////////////////////

const setNombre = (nombre, apellido) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
    document.getElementById("nombreUsuario").innerHTML = nombre +" "+ apellido;
}

const setEmail = (email) => {
    document.getElementById("email").innerHTML = email;
}
const setEstudios = (estudios) => {
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
    let id = await  getID(getEmail());
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
    let txt_body = '{ "id": "'
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

    localStorage.setItem("hayLogin", false);
    if(request.ok) {
        let request2 = await fetch("/api/v1/logout",{
            method : 'POST'
        });
        if(request2.ok){
            console.log("sesión cerrada");
        }
        
    }
}

//////////////////////////////////////////////////////////////////////
setNombre(getNombre(), getApellido());
setEmail(getEmail());
setEstudios(getEstudios());
$("#btnTab2").click(() => getOffersAndDisplay())
$("#cerrarSesion").click(() => noLogin(getId()));



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

        if(res.length !== 0){
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
        } else {
            document.getElementById("tab2").innerHTML = "<h4>¡Vaya! Aún no tienes ninguna oferta guardada...</h4><br>"
        }
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
                deleteApplication(obj.appId);
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
    let request2 = await fetch("/api/v1/logout",{
        method : 'POST'
    });
    if(request2.ok){
    }
        
}
/////////////////////////////////////////////////////////////////////

const getNombreUsuario = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        if(res == "Admin"){
            window.location.href = '/perfilAdmin.html';
        } 
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
                setNombre(obj.userName, obj.userSurname, obj.userEmail, obj.userStudies);
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
            }
        });
    }
}


//Checks if user is not admin in order to direct to page
const begin = async () => {
    let isAdmin = true;
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let user = await request.text();
        
        let requestUsers = await fetch("/api/v1/users", {
            method: 'GET',
        });

        if(requestUsers.ok) {
            let userList = await requestUsers.json();

            userList.forEach(obj => {
                if((obj.userName ===  user)&&(obj.role != "ROLE_ADMIN")){
                    isAdmin = false;
                } else if ((obj.userName ===  user)&&(obj.role == "ROLE_ADMIN")) {
                    document.getElementById("nombreLogin").innerHTML = obj.userName;
                }
            });
        }
    }
    

    if(isAdmin){
        window.location.href = '/perfilAdmin.html';
    } 
}

begin();



//////////////////////////////////////////////////////////////////////
getNombreUsuario();
$("#btnTab2").click(() => getOffersAndDisplay())
$("#cerrarSesion").click(() => noLogin(getId()));



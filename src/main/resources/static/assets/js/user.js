const getNombre = () => {
    return localStorage.getItem("userName");
}
const getApellido = () => {
    return localStorage.getItem("userSurname");
}
const getEmail = () => {
    return localStorage.getItem("userEmail");
}
const getEstudios = () => {
    return localStorage.getItem("userStudies");
}


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
            + 'edit_btn">No guardar</button></div> </li> <br>';
        });
        text += '</ul>';
        document.getElementById("tab2").innerHTML=text;


        res.forEach(obj => {
            $('#' + obj.id + 'edit_btn').click(() => editOffer(obj.id));
        });
    }
}

//////////////////////////////////////////////////////////////////////
setNombre(getNombre(), getApellido());
setEmail(getEmail());
setEstudios(getEstudios());
$("#btnTab2").click(() => getOffersAndDisplay())

//falta poder meter el id de forma automática
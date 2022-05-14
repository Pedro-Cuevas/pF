const getNombre = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).userName;
}

const getId = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).id;
}

const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// gets the new list of offers and displays it
const getOffersAndDisplay = async (user_id) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            text += '<li class="list-group-item">'
            +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
            + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
            + ' id="' + obj.id
            + 'select">Seleccionar</button></div></li> <br>';
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}

const createApplication = async (offer_id) => {
    user_id = getId();

    let request = await fetch("/api/v1/applications/offerUser/"+ offer_id + "/" + user_id, {
        method: 'GET',
    });

    let txt_body = '{ "offerId": "'
        + offer_id
        + '", "userId": "'
        + user_id
        + '"}';

    if(request.ok) {
        let texto = await request.text();
        if(texto == ""){
            alert("Se ha añadido esta oferta a sus selecciones");
            createNewApplication(txt_body);
        } else {
            alert("Esta oferta ya la tiene guardada");
        }

    }
}

const createNewApplication = async (txt_body) => {
    let request = await fetch("/api/v1/applications", {
        method: 'POST',
        body: txt_body,
        headers: {
            "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
        },
        dataType: "json",
    });

    if(request.ok) {
        let res = await request.json();
        console.log(res);
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////

getOffersAndDisplay();
setNombre(getNombre());





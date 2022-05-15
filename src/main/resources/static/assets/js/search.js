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
const getOffersAndDisplay = async () => {
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
////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
const filtrarBusqueda = async () => {
    let nombre = document.getElementById("name").value;
    let inicio = document.getElementById("begining").value;
    let fin = document.getElementById("end").value;

    if (nombre != "" && fin != "" && inicio != ""){
        filterByAll(nombre, inicio, fin);
    }else if (fin != "" && inicio != ""){
        filterByDates(inicio, fin);
    } else if (nombre != "" && inicio != ""){
        filterByNameDate(nombre, 0, inicio);
    } else if (nombre != "" && fin != ""){
        filterByNameDate(nombre, 1, fin);
    } else if(nombre == "" && inicio == "" && fin ==""){
        getOffersAndDisplay();
    } else if (nombre != "") {
        filterByName(nombre);
    } else if (inicio != "") {
        filterByDate(0, inicio);
    } else if (fin != "") {
        filterByDate(1, fin);
    }
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByName = async (name) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(name == obj.offerName){
                text += '<li class="list-group-item">'
                +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                + ' id="' + obj.id
                + 'select">Seleccionar</button></div></li> <br>';
            }
            
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByDate = async (beg, date) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(beg == 0){ //date begining
                if(obj.dateBegining > date){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else { //date end
                if(obj.dateEnd < date){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            }            
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByDates = async (beg, end) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(obj.dateBegining > beg && obj.dateEnd < end){
                text += '<li class="list-group-item">'
                +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                + ' id="' + obj.id
                + 'select">Seleccionar</button></div></li> <br>';
            }
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByNameDate = async (name, beg, date) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(beg == 0){ //date begining
                if(obj.dateBegining > date && name == obj.offerName){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else { //date end
                if(obj.dateEnd < date && name == obj.offerName){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            }            
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByAll = async (name, beg, end) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(name == obj.offerName && obj.dateBegining > beg && obj.dateEnd < end){
                text += '<li class="list-group-item">'
                +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                + ' id="' + obj.id
                + 'select">Seleccionar</button></div></li> <br>';
            }
            
        });
        text += '</ul> </center>';
        $('#offerList').html(text);

        res.forEach(obj => {
            $('#' + obj.id + 'select').click(() => createApplication(obj.id));
        });
    }
}




///////////////////////////////////////////////////////////////////////////////////////////////////////
getOffersAndDisplay();
setNombre(getNombre());
$('#buscar').click(() => filtrarBusqueda());

document.getElementById("buscar").addEventListener("click", function(event){
    event.preventDefault()
});





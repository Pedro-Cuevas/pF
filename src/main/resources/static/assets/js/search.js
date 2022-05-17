const getId = () => {
    return JSON.parse(localStorage.getItem("userLoggedIn")).id;
}

const setId = async (nombre) => {
    let request = await fetch("/api/v1/users", {
        method: 'GET',
    });

    if(request.ok){
        let res = await request.json();
        res.forEach(obj => {
            if(obj.userName == nombre){
                localStorage.setItem("userLoggedIn", JSON.stringify(obj));
            }
        });
    }
}

const setNombre = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        setId(res);
        if(res == "Admin"){
            console.log("Admin");
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./perfilAdmin.html";
        } else {
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./user.html";
        }
    }   
}

setNombre();
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
        filterByTwo(2, inicio, fin);
    } else if (nombre != "" && inicio != ""){
        filterByTwo(0, nombre, inicio);
    } else if (nombre != "" && fin != ""){
        filterByTwo(1, nombre, fin);
    } else if(nombre == "" && inicio == "" && fin ==""){
        getOffersAndDisplay();
    } else if (nombre != "") {
        filterByOne(2, nombre);
    } else if (inicio != "") {
        filterByOne(0, inicio);
    } else if (fin != "") {
        filterByOne(1, fin);
    }
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const filterByOne = async (beg, filter) => {
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(beg == 0){ //date begining
                if(obj.dateBegining > filter){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else if(beg == 1){ //date end
                if(obj.dateEnd < filter){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else if(beg == 2){ //name
                if(filter == obj.offerName){
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
const filterByTwo = async (val, filter1, filter2) => {
    //val == 0, filter1 = name, filter2 = beg
    //val == 1, filter1 = name, filter2 = end
    //val == 2, filter1 = beg, filter2 = end
    let request = await fetch("/api/v1/offers", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        //console.log(res);

        let text = '<center> <ul class="list-group">';
        res.forEach(obj => {
            if(val == 0){
                if(obj.dateBegining > filter2 && filter1 == obj.offerName){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else if (val == 1){
                if(obj.dateBegining > filter2 && filter1 == obj.offerName){
                    text += '<li class="list-group-item">'
                    +  obj.offerName + ', de ' + obj.dateBegining + ' a ' + obj.dateEnd
                    + '<div class="btn-group" role="group" aria-label="button group" style="float:right"> <button type="submit" class="btn btn-primary"'
                    + ' id="' + obj.id
                    + 'select">Seleccionar</button></div></li> <br>';
                }
            } else if (val == 2){
                if(obj.dateEnd < filter2 && obj.dateEnd < filter2){
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
$('#buscar').click(() => filtrarBusqueda());

document.getElementById("buscar").addEventListener("click", function(event){
    event.preventDefault()
});

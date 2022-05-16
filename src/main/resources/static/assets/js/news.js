/////////////////////////////////////////////////////////////////////////////////////////////////////////
// gets the list of news and displays it
const getNewsAndDisplay = async () => {
    let url = 'https://newsapi.org/v2/everything?q=Telefónica-telefónica&sortBy=relevancy&language=es&apiKey=e1c20127402a4673849c60cd7be88f99'

    let request = await fetch(url, {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
        console.log(res);
        let text = '<ul class="list-group">';
        res.articles.forEach(obj => {
            text += '<li class="list-group-item"><a href="'
            +  obj.url + '">'
            + '<h5>' + obj.title
            + '</h5></a></li>';
        });
        text += '</ul>';
        $('#newsList').html(text);
    }
}

getNewsAndDisplay();


/*
//////////////////////////////////////////////////////////////////////////////////////
const setNombre = (nombre) => {
    document.getElementById("nombreLogin").innerHTML = nombre;
}

//////////////////////////////////////////////////////////////////////////////////////
const getLogin = async () => {
    let request = await fetch("/api/v1/login/logged", {
        method: 'GET',
    });

    localStorage.setItem("hayLogin", false);
    if(request.ok) {
        texto = await request.text();
        if(texto == ""){
            console.log("no hay login");
        } else {
            console.log("hay login");
            let obj = JSON.parse(texto);
            localStorage.setItem("hayLogin", true);
            let request2 = await fetch("/api/v1/users/"+obj.userId, {
                method: 'GET',
            });
            if(request2.ok){
                let user = await request2.json();
                localStorage.setItem("userLoggedIn", JSON.stringify(user));
                setNombre(user.userName);
            }
        }
    }
}
//////////////////////////////////////////////////////////
const direccionLink = () => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById("nombreLogin").href = "./user.html";
    } else {
        document.getElementById("nombreLogin").href = "./login.html";
    }
}

//////////////////////////////////////////////////////////

const getOfertas = (boton) => {
    let login = localStorage.getItem("hayLogin");
    if(login == "true"){
        document.getElementById(boton).href = "./search.html";
    } else {
        alert("Es necesario registrarse antes de acceder al buscador")
        document.getElementById(boton).href = "./login.html";
    }
}

getLogin();
$('#nombreLogin').click(() => direccionLink());
$('#navOfertas').click(() => getOfertas("navOfertas"));

*/
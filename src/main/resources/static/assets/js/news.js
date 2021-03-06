/////////////////////////////////////////////////////////////////////////////////////////////////////////
// gets the list of news and displays it
const getNewsAndDisplay = async () => {
    let url = 'https://newsapi.org/v2/everything?q=Telefónica-telefónica&sortBy=relevancy&language=es&apiKey=e1c20127402a4673849c60cd7be88f99'

    let request = await fetch(url, {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.json();
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


////////////////////////////////////////////////////////////////////////////////
const setNombre = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        if(res == "anonymousUser"){
            document.getElementById("nombreLogin").innerHTML = "Registro";
            document.getElementById("nombreLogin").href = "./register.html";
        } else if(res == "Admin"){
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./perfilAdmin.html";
        } else {
            document.getElementById("nombreLogin").innerHTML = res;
            document.getElementById("nombreLogin").href = "./user.html";
        }
    }   
}

setNombre();


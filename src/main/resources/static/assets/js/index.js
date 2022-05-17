const setNombre = async () => {
    let request = await fetch("/api/v1/login", {
        method: 'GET',
    });

    if(request.ok) {
        let res = await request.text();
        console.log(res);
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
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
/*
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

getLogin();


*/
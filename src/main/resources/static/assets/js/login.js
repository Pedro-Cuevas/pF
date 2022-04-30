const getUsers = async () => {
    let userEmail = $('#email').val();
    if(userEmail == ""){
        let request = await fetch("/api/v1/users" , {
            method: 'GET',
        });
    
        if(request.ok) {
            let res = await request.json();
            //console.log(res);
        }
    } else {
        let request = await fetch("/api/v1/users/?userEmail=" + userEmail, {
            method: 'GET',
        });
    
        if(request.ok) {
            let res = await request.json();
            localStorage.setItem("userLoggedIn", JSON.stringify(res[0]));
            localStorage.setItem("hayLogin", true);

            let txt_body = '{ "id": "'
                + res[0].id
                + '", "userId": "'
                + res[0].id
                + '", "isLogged": "'
                + 1
                + '"}';

            let request2 = await fetch("/api/v1/login/" + res[0].id, {
                body: txt_body,
                method: 'PUT',
                //body: txt_body,
                headers: {
                    "Content-Type": "application/json", // Indico que mis datos van a estar en JSON
                },
                dataType: "json",
            });

            if(request2.ok) {
                console.log("oferta actualizada");
            }

            window.location ="./user.html";
            /*exists = false;
            let id = $('#email').val();
            res.forEach(obj => {
                if(id == obj.id){
                    exists = true;
                };
            });
            
            if(exists == false){
                alert("Este usuario no está registrado");
            } else {
                alert("Este usuario está registrado");
            }*/
    
        }
    }

}

$('#btnLogin').click(() => getUsers());

// Prevent a link from opening the URL
if(document.getElementById("btnLogin") != null){
    document.getElementById("btnLogin").addEventListener("click", function(event){
        event.preventDefault()
    });
}

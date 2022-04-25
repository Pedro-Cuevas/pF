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
            localStorage.setItem("userName", res[0].userName);
            localStorage.setItem("userSurname", res[0].userSurname);
            localStorage.setItem("userEmail", res[0].userEmail);
            localStorage.setItem("userStudies", res[0].userStudies);
            localStorage.setItem("hayLogin", true);

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


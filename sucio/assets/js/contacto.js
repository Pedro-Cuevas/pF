const putContactData = async () => {
    let inputName = document.getElementById("name").value;
    let inputSurname = document.getElementById("surname").value;
    let inputEmail = document.getElementById("email").value;
    let inputGender = document.getElementById("gender").value;
    let inputDataPolicyCheck = document.getElementById("dataPolicyCheck").checked; //boolean
    let inputTextProblem = document.getElementById("textProblem").value;

    let request = await fetch("/contacto", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: inputName,
            surname: inputSurname,
            email: inputEmail,
            gender: inputGender,
            dataPolicyCheck: inputDataPolicyCheck,
            textProblem: inputTextProblem,
        }),
    });

    if(request.ok) {
        displayLastContact();
    }
}

const displayLastContact = async () => {
    
    let request = await fetch("/contacto", {
        method: 'GET',
    });

    if(request.ok) {
        let contacto = await request.json();
        console.log(contacto);
        let texto = "<h3>Solicitud guardada</h3><p>" + contacto.name + ", te enviaremos un correo a " 
        + contacto.email + " próximamente</p>";
        document.getElementById("getMessage").innerHTML = texto;
        document.getElementById("sectionGetMessage").style.display = 'block';
        document.getElementById("getMessageContainer").scrollIntoView();
    }
}

document.getElementById("btnContact").addEventListener("click", putContactData)
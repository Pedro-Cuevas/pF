/* Function that displays covid data
*/
let displayData = async(countryCode) => {
	let data = await fetchData(countryCode);
	if(data === "not found")
	{
		$("#covid-counts").hide();
		$("#error-message").show();
	}
	else
	{
		$("#covid-counts").hide();
		$("#error-message").hide();
		$("#newPos").attr("data-purecounter-end", data.NewConfirmed).attr("data-purecounter-duration", "1").html(data.NewConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		$("#totalPos").attr("data-purecounter-end", data.TotalConfirmed).attr("data-purecounter-duration", "1").html(data.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		$("#newDeaths").attr("data-purecounter-end", data.NewDeaths).attr("data-purecounter-duration", "1").html(data.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		$("#totalDeaths").attr("data-purecounter-end", data.TotalDeaths).attr("data-purecounter-duration", "1").html(data.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
		$("#covid-counts").show();
	}
}

/* Function that fetches the COVID-19
* data of a given country
*/
let fetchData = async(countryCode) => {
	let url = "https://api.covid19api.com/summary"
	
	let peticion = await fetch(url, {
		method: "GET",
	});

	let data = "not found";
	if (peticion.status === 200) {
		datos = await peticion.json();

		datos.Countries.forEach(element => {
			if(countryCode === element.CountryCode)
			{
				data = element;
			}
		})
	}

	return data;
}


/* Function that uses the user's IP to 
*  detect their country and displays the COVID
*  related data
*/
let getMyCountryAndDisplay = async () =>{
    let peticion = await fetch('https://api.my-ip.io/ip.json', {
        method: "GET",
    });

    if (peticion.status === 200) {
		let ip_json = await peticion.json();
        let ip = ip_json.ip
        
		let url = "https://api.ip2country.info/ip?" + ip;
		let peticion2 = await fetch(url, {
			method: "GET",
		});

		if(peticion2.status === 200){
			let pais_json = await peticion2.json();			
			displayData(pais_json.countryCode);
			$("#countrySelection").val(pais_json.countryCode);
		}
	}
}

/* Function that uses the user's IP to 
*  detect their country and displays the COVID
*  related data
*/
let getSelCountryAndDisplay = async () =>{

	let countryCode = $("#countrySelection").val();
	
	displayData(countryCode);
}

//adding event listeners to the buttons
document.getElementById("myCountry").addEventListener("click", getMyCountryAndDisplay);
document.getElementById("selCountry").addEventListener("click", getSelCountryAndDisplay);
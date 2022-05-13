/////////////////////////////////////////////////////////////////////////////////////////////////////////
// gets the list of news and displays it
const getNewsAndDisplay = async () => {
    let url = "https://newsapi.org/v2/everything?q=Telefonica&language=es&apiKey=e1c20127402a4673849c60cd7be88f99"

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
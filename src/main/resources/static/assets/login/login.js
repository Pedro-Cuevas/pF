app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });
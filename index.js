const express = require('express');
const axios = require('axios');
const PORT = process.env.PORT || 3000;


//App Setup
var app = express();
var server = app.listen(PORT, function(){
    console.log('listening to requests on port', PORT);
});

//Static files
app.use(express.static('public'));


app.get('/search/:trackName', async (req, res) => {
    const { trackName } = req.params;
    try {
        const response = await axios.get(`https://api.deezer.com/search?q=${trackName}`);
        const tracks = response.data.data;
        res.json(tracks);
    } catch (error) {
        res.status(500).send('ERROR fetching data from Deezer API');
    }
});

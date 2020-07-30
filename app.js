const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/memory_game.html');
})

app.listen(3000, () => {
    console.log("Server is started");
})
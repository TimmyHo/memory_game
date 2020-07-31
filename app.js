const express = require('express');
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/memory_game.html');
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is started");
})
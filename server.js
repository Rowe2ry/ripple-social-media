const express = require('express');
const database = require('./config/connection');
const routes = require('./Routes');

const PORT = process.env || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(routes)

database.once('open', () => {
    app.listen(PORT, () => {
        console.log(`success captain. Direct all Insomnia routes to http://localhost:${PORT}`);
    });
});
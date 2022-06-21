const express = require('express');
const product = require('./routes/product');
const app = express();
const PORT = 8080;
//main middlewares 
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// routes
app.use('/api/productos', product);

const server = app.listen(PORT,()=> {
    console.log(`Servidor escuchando por el puertos ${server.address().port}`);
});

server.on('error', (error) => {
    console.log(error);
})
var port= 3000;
const express = require('express');
const app = express();
const routes = require('./src/Routers/routes');
const path = require('path');

app.use(express.urlencoded( {extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine' , 'ejs');

app.use(routes);

app.listen(port);
console.log("server rodando em http://localhost:"+port+ " .");
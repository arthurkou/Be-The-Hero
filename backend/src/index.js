const express = require('express'); //importando as funcionalidades do express
const cors = require('cors');
const routes = require('./routes'); //'./' porque é um arquivo

const app = express(); //instanciando uma aplicação express

app.use(cors());
app.use(express.json()); //transformar o json em javascript
app.use(routes);



app.listen(3333);
const express = require('express');
//const crypto = require('crypto');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router(); //tira o método de rotas do express e colocando na variável

//rota de login (sessão)
routes.post('/sessions', SessionController.create);

//get de todas as ongs(id) registradas no bd -> listagem
routes.get('/ongs', OngController.index);
//registrar ongs no bd (POST) -> cadastro
routes.post('/ongs', OngController.create);    
//get de todas os incidentes registradas no bd -> listagem
routes.get('/incidents', IncidentController.index);
//registrar incidents no bd (POST) -> cadastro
routes.post('/incidents', IncidentController.create);
//delete incidents;
routes.delete('/incidents/:id', IncidentController.delete);

//listar incidentes criados pela ong desse id
routes.get('/profile', ProfileController.index);


module.exports = routes;
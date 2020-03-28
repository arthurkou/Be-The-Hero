const crypto = require('crypto');
//conexão com bd
const connection = require('../database/connection');

module.exports = {
    //get de todas as ongs(id) registradas no bd -> listagem
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //registrar ongs no bd (POST) -> cadastro
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        //await -> esperar finalizar o insert para responder o json
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        //id que será usado para se conectar com a aplicação
        return response.json({ id });
    }
}
const connection = require('../database/connection');

module.exports = {
    //listagem
    async index(request, response) {
        const { page = 1} = request.query; //paginação do http

        //passar todos os dados da paginação para o front saber o volume total
        const [count] = await connection('incidents').count();

        console.log(count);

        //limitando 5 incidentes por página
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //traz dados da ong relacionado aquele incidente
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);
    
        response.header('X-Total-Count', count['count(*)']); //apresentar o total no cabeçalho da resposta (header)

        return response.json(incidents);
    },
    //cadastro
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; //id da ong logada gerado por criptografia e colocado no authorization do postman

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params; //parametro de rota - id do incidente
        const ong_id = request.headers.authorization; //id da ong logada na aplicação

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
            //comparando o id da ong logado com a ong do incidente
            if(incident.ong_id != ong_id) {
                return response.status(401).json({ error: 'Operation not permited.'});
            }

            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
    }

}
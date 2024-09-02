import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './database';
import indexRouter from './routers/index';

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(indexRouter);

async function initServer(){
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        server.listen(3000, () => {
            console.log('servidor rodando')
        })
        
    } catch(error) {
        console.error('Erro ao conectar ao banco de dados', error);
    }

}


initServer()


import { Response } from "express";
import ItemMenu, { ItemMenuAttributes } from "../models/ItemMenu";
import { formartDate } from "../utils/formatDate";
import { SendResponseList } from "../interfaces/SendResponseList";

class ItemMenuService {

    public async getMenu(page: number = 1, pageSize: number = 12): Promise<SendResponseList>{
        try {
            const offset = ( page - 1 ) * pageSize;
            let { rows: result, count: total} = await ItemMenu.findAndCountAll({
                offset: offset,
                limit: pageSize,
                order: [['id', 'ASC']]
            });

            const itens = result.map((item) => ({
                ...item.toJSON(),
                data_criacao: formartDate(item.data_criacao.toISOString()),
                data_atualizacao: formartDate(item.data_atualizacao.toISOString())
            }));

            return {
                total,
                page,
                pageSize,
                itens
            }

        } catch (error) {
            console.error(error);
            throw new Error('Erro ao consultar o menu');
        }
    }

    public async createItem(data: ItemMenuAttributes): Promise<{ error?: any; item?: string }> {
        try {
            const item = await ItemMenu.create({
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                imagem: data.imagem,
                categoria: data.categoria,
                data_criacao: data.data_criacao,
            });

            const nomeItem: string = item.dataValues.nome
            return {item: nomeItem } ;

        } catch(error){
            console.error(error);
            throw new Error('Erro ao criar um novo item');
        }
    }
}

export default ItemMenuService;
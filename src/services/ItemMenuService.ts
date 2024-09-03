import ItemMenu, { ItemMenuAttributes } from "../models/ItemMenu";
import { formartDate } from "../utils/formatDate";

class ItemMenuService {

    public async getMenu(page: number = 1, pageSize: number = 12){
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
            console.error('Erro ao buscar itens do menu:', error);
            return { mensagem: 'Ocorreu algum erro ao consultar o menu', error };
        }
    }

    public async createItem(data: ItemMenuAttributes) {
        try {
            const item = await ItemMenu.create({
                nome: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                imagem: data.imagem,
                categoria: data.categoria,
                data_criacao: data.data_criacao,
            });

            return { mensagem: 'Item criado com sucesso!', item: item };

        } catch(error){
            console.error(error);
            return { mensagem: 'Ocorreu algum erro ao criar um novo item', error };
        }
    }
}

export default ItemMenuService;
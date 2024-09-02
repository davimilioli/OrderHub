import ItemMenu, { ItemMenuAttributes } from "../models/ItemMenu";

class ItemMenuService {

    public async getMenu(){
        try {
            const items: ItemMenuAttributes[] = await ItemMenu.findAll();
            return items;
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
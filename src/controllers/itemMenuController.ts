import { Response, Request } from "express";
import { ItemMenuAttributes } from "../models/ItemMenu";
import ItemMenuService from "../services/ItemMenuService";
import { sendResponse } from "../utils/responseHandler";

class ItemMenuController {

    public static async index(req: Request, res: Response){
        let page: number = parseInt(req.query.page as string) || 1;
        let pageSize: number = parseInt(req.query.pageSize as string) || 12;

        if(isNaN(page) || page <= 0 ) page = 1;
        if(isNaN(pageSize) || pageSize <= 0 ) pageSize = 12;

        const itemMenuService = new ItemMenuService();
        const menuItems = await itemMenuService.getMenu(page, pageSize);

        if(menuItems.error){
            return sendResponse(res, 500, null, {
                mensagem: 'Erro ao buscar itens do menu',
                error: menuItems.error,
                code: 500
            });
        }

        return sendResponse(res, 200, {
            result: menuItems
        })
    } 

    public static async create(req: Request, res: Response){
        const itemMenuService = new ItemMenuService();
        const { nome, descricao, preco, categoria, imagem } = req.body;
        const data: ItemMenuAttributes = { 
            nome,
            descricao,
            preco,
            categoria,
            imagem,
            data_criacao: new Date()
        };

        const createItem = await itemMenuService.createItem(data);
        res.status(201).json({ createItem });
    }
}

export default ItemMenuController;
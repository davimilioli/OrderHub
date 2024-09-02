import { Response, Request } from "express";
import { ItemMenuAttributes } from "../models/ItemMenu";
import ItemMenuService from "../services/ItemMenuService";

class ItemMenuController {

    public static async index(req: Request, res: Response){
        const itemMenuService = new ItemMenuService();
        const menuItems = await itemMenuService.getMenu();
        return res.status(200).json({menuItems});
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
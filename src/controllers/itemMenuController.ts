import { Response, Request } from "express";
import { ItemMenuAttributes } from "../models/ItemMenu";
import ItemMenuService from "../services/ItemMenuService";
import { sendResponse } from "../utils/responseHandler";
import { SendResponseList } from "../interfaces/SendResponseList";
import ImageService from "../services/ImageService";

class ItemMenuController {

    public static async index(req: Request, res: Response): Promise<Response>{
        let page: number = parseInt(req.query.page as string) || 1;
        let pageSize: number = parseInt(req.query.pageSize as string) || 12;

        if(isNaN(page) || page <= 0 ) page = 1;
        if(isNaN(pageSize) || pageSize <= 0 ) pageSize = 12;

        const itemMenuService = new ItemMenuService();
        const menuItems: SendResponseList = await itemMenuService.getMenu(page, pageSize);

        if(menuItems.error){
            return sendResponse(res, 500, null, {
                mensagem: 'Erro ao buscar itens do menu'
            });
        }

        return sendResponse(res, 200, {
            result: menuItems
        })
    } 

    public static async create(req: Request, res: Response): Promise<Response>{
        const itemMenuService = new ItemMenuService();
        const { nome, descricao, preco, categoria } = req.body;

        if(!nome || !descricao || !preco || !categoria) {
            return sendResponse(res, 400, null, {
                mensagem: 'Os campos nome, descricao, preco e categoria são obrigatórios.'
            });
        }

        const data: ItemMenuAttributes = { 
            nome,
            descricao,
            preco,
            categoria,
            data_criacao: new Date(),
            data_atualizacao: new Date()
        };

        const createItem = await itemMenuService.createItem(data);

        if(createItem.error){
            return sendResponse(res, 500, null, {
                mensagem: `Não foi possível criar o item ${nome}`,
            });
        }

        return sendResponse(res, 201, {
            mensagem: `O item ${nome} foi criado com sucesso`,
        });
    }

    public static upload(req: Request, res: Response): any {
        const imageService = new ImageService
        const image = req.file

        if(!image){
            return;
        }
        
        imageService.processImage(image); 
    }
}

export default ItemMenuController;
import { ItemMenuAttributes } from "../models/ItemMenu";

export interface SendResponseList {
    total?: number
    page?: number
    pageSize?: number
    itens?: ItemMenuAttributes[]
    mensagem?: string
    error?: any
}
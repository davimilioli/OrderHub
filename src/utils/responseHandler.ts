import { Response } from "express";

export function sendResponse(res: Response, statusCode: number, data: any, error: any = null){
    
    if(error){
        return res.status(statusCode).json({
            ...data,
            error
        })
    }

    return res.status(statusCode).json({
        ...data
    })

};
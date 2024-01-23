import { Response } from "express";

const sendApiResponse = (res: Response, statusCode: number, data: object) => {
    if (!res.headersSent) {
        res.status(statusCode).send({
            error: false,
            data
        })
    }
}

const sendApiErrorResponse = (res: Response, statusCode: number, message: string) => {
    if (!res.headersSent) {
        res.status(statusCode).send({
            error: {
                status: statusCode,
                message
            }
        })
    }
}

export { sendApiResponse, sendApiErrorResponse }
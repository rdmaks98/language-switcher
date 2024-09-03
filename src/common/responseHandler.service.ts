import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseHandlerService {
    constructor() { }

    // [ > ] send success response for return api
    public async sendSuccessResponse(res: any, data: any, method?: string, message?: string) {

        switch (method.toLowerCase()) {
            case 'get':
                return res.status(HttpStatus.OK).json({
                    success: true,
                    data,
                    message: message ? `🤩 ${message}` : "result get successfully",
                });
                break;
            default:
                return res.status(HttpStatus.OK).json({
                    success: true,
                    data,
                    message: message ? `🔥 ${message}` : "api is call successfully",
                });
                break;
        }
    }

}

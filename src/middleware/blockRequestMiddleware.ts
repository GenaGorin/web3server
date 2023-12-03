import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';


@Injectable()
export class ClientBlockingMiddleware implements NestMiddleware {
    private blockedClients: { [key: string]: number } = {};

    use(req: any, res: any, next: NextFunction) {
        const clientAddress = req.body.address;
        console.log('clientAddress', clientAddress);

        if (this.blockedClients[clientAddress]) {
            const remainingTime = this.blockedClients[clientAddress] - Date.now();
            if (remainingTime > 0) {
                res.status(429).json({
                    message: `Вы заблокированы на ${Math.ceil(
                        remainingTime / 1000,
                    )} секунд.`,
                });
                return;
            } else {
                delete this.blockedClients[clientAddress];
            }
        }
        this.blockedClients[clientAddress] = Date.now() + 30000;

        next();
    }
}
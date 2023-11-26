import compression from 'compression';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CompressionMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        return compression()(req, res, next);
    }
}

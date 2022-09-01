import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

// declare global {
//   namespace Express {
//     interface Request {
//       curretUser?: User;
//     }
//   }
// }

export interface IGetUserAuthInfoRequest extends Request {
  currentUser?: User; // or any other type
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}

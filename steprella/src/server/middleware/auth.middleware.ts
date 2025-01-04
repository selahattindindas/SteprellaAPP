import { Injectable } from '@angular/core';
import { Request, Response, NextFunction } from 'express';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthErrorMessages } from '../../app/core/types/auth.types';

interface User {
  id: number;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class AuthMiddleware {
  private jwtHelper = new JwtHelperService();

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken'];

    if (!token) {
      return res.status(401).json({ 
        statusCode: 401,
        message: AuthErrorMessages.SESSION_NOT_FOUND 
      });
    }

    const decoded = this.jwtHelper.decodeToken(token) as User;
    if (!decoded) {
      return res.status(401).json({ 
        statusCode: 401,
        message: AuthErrorMessages.INVALID_SESSION 
      });
    }

    req.user = decoded;
    return next();
  }

  checkRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      
      if (!user?.role) {
        return res.status(403).json({ 
          statusCode: 403,
          message: AuthErrorMessages.PERMISSION_NOT_FOUND 
        });
      }

      if (user.role !== role) {
        return res.status(403).json({ 
          statusCode: 403,
          message: AuthErrorMessages.INSUFFICIENT_PERMISSION 
        });
      }

      return next();
    };
  }
}
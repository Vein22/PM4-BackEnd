import { Injectable, CanActivate, ExecutionContext, UnauthorizedException  } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";
import { Observable } from 'rxjs';
import { Role } from "../roles/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1] ?? '';
       
        if (!token) {
            throw new UnauthorizedException('Bearer token is missing');
          }
           try {
             const secret = process.env.JWT_SECRET;
             const payload = this.jwtService.verify(token, {secret});
             payload.iat = new Date(payload.iat * 1000);
             payload.iat = new Date(payload.exp * 1000);
             payload.roles = [Role.Admin];
             request.user = payload;
             return true;

           } catch (error) {
            throw new UnauthorizedException('Invalid Token');
           }
     }
}
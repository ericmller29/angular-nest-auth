import { Injectable } from "@nestjs/common";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class HttpInterceptorApp implements HttpInterceptor {
    constructor( 
        private readonly authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let user = this.authService.user;

        if(user && user.access_token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
        }
        
        return next.handle(req);
    }
}
import { Injectable } from "@nestjs/common";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( 
        private readonly authService: AuthService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if(err.status === 401) {
                    this.authService.logout();
                    location.reload(true);
                }

                const error = err.error.message || err.statusText;
                console.log(err);
                return throwError(error);
            })
        )
    }
}
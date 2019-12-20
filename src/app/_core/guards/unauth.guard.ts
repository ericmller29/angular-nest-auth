import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        const currentUser = this.authService.user;

        if(!currentUser) {
            return true;
        }

        this.router.navigate(['/dashboard']);

        return false;
    }
  
}

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <a [routerLink]="['/auth/login']">
            Login
        </a>
        -
        <a [routerLink]="['/auth/register']">
            Register
        </a>
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class AppComponent {
    title = 'igloo';
}

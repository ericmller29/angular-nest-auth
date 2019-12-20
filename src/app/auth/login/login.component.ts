import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    errors = [];
    loginForm: FormGroup;
    loginSub;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    login() {
        this.loginSub = this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                },
                err => {
                    this.errors.push(err);
                }
            );
    }

}

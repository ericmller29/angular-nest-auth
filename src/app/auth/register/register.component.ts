import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', Validators.required],
            password: ['', Validators.required],
            confirm_password: ['', Validators.required]
        }, { validator: this.checkPasswords });
    }

    onSubmit(){
        this.authService.register(this.registerForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/auth/login']);
                },
                err => {
                    console.log(err);
                }
            )
    }

    private checkPasswords(group: FormGroup) {
        const pass = group.get('password').value;
        const confirm = group.get('confirm_password').value;
        
        return pass === confirm ? null : { notSame: true };
    }

}

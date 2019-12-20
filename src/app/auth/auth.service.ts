import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<any>;
    public user$: Observable<any>;

    constructor(
        private http: HttpClient
    ) {
        
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
        this.user$ = this.userSubject.asObservable();
    }

    public get user(): any {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post('/api/auth/login', { email, password })
            .pipe(
                shareReplay(1),
                tap((data: any) => {
                    localStorage.setItem('user', JSON.stringify(data));

                    this.userSubject.next(data);

                    return data.user;
                })
            );
    }

    register(user) {
        const { email, name, password } = user;

        return this.http.post('/api/auth/register', {
            email,
            name,
            password
        })
            .pipe(
                shareReplay(1)
            );
    }

    logout() {
        localStorage.removeItem('user');
    }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_core/guards/auth.guard';
import { UnAuthGuard } from './_core/guards/unauth.guard';


const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

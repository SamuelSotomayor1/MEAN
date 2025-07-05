import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: "login", component: Login},
    {path: "register", component: Register},
    {path: "home", component: Home},
    {path: "", component: Login},
];

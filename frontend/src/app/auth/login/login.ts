import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  this.http.post('http://localhost:3002/api/login', this.user).subscribe({
    next: (res: any) => {
      console.log('Usuario logueado correctamente', res);
      localStorage.setItem('token', res.accessToken);
      // Redirigir a la página protegida
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Error al loguear usuario', err);
    }
  });
}
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  register() {
    this.http.post('http://localhost:3002/api/register', this.user).subscribe({
      next: (res) => {
        console.log('Usuario registrado correctamente', res);
        alert('Usuario registrado correctamente');
        
        // Redirige o muestra mensaje
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
      }
    });
  }
}

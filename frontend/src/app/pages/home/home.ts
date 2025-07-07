import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../shared/navbar/navbar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Bet {
  _id: string;
  match: string;
  amountBet: number;
  amountWon: number;
  status: string;
  date: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  bets: any[] = [];
  editingBet: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBets();
  }

  loadBets() {
    this.http.get<any[]>('http://localhost:3002/api/bets').subscribe({
      next: (data) => this.bets = data,
      error: (err) => console.error('Error al cargar apuestas', err)
    });
  }

  saveEdit() {
    if (this.editingBet.date) {
      this.editingBet.date = new Date(this.editingBet.date).toISOString();
    }

    this.http.put(`http://localhost:3002/api/bets/${this.editingBet._id}`, this.editingBet).subscribe({
      next: () => {
        this.editingBet = null;
        this.loadBets();
      },
      error: (err) => console.error('Error editando apuesta', err)
    });
  }

  deleteBet(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta apuesta?')) {
      this.http.delete(`http://localhost:3002/api/bets/${id}`).subscribe({
        next: () => this.loadBets(),
        error: (err) => console.error('Error eliminando apuesta', err)
      });
    }
  }
}

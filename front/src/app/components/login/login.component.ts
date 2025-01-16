import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username.trim()) {
      localStorage.setItem('chat_username', this.username.trim());
      this.router.navigate(['/chat']);
    }
  }
}

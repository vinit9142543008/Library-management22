import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
loginForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private auth: Auth,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
onLogin() {
  if (this.loginForm.valid) {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {

        console.log('Saved User', res.user);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/users']);
        } else {
          this.router.navigate(['/student/books']);
        }
      },

      error: (err) => {
        console.log(err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }
} 
}

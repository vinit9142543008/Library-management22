import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {
  form!:FormGroup;
  hide=true;

  constructor(private auth: Auth, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Reset is working', this.form.value);

      this.auth.resetPassword(this.form.value).subscribe({
        next: () => alert('Password reset successful'),
        // error: (err) => alert(err.error.message)
      });
    }
  
 }
}

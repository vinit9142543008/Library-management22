import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  hide=true
  register!:FormGroup;
  constructor(private fb:FormBuilder,private auth:Auth ){
    this.register=this.fb.group({
    firstname:fb.control('',[Validators.required]),
        lastname:fb.control('',[Validators.required]),
    email:fb.control('',[Validators.required]),
    mobileNumber:fb.control('',[Validators.required]),
    password:fb.control('' ,[Validators.required]),
    repeatPassword:fb.control('',[Validators.required]),

    })
  }
  togglePassword(){
    this.hide=!this.hide
  }

  onSubmit() {
    console.log('Clicked',this.register.value)
    if (this.register.valid) {
      this.auth.register(this.register.value).subscribe({
        next: (res) => {
          console.log('Responce ',res);
          alert('Registered Successfully');
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    'firstname': ['', [Validators.required]],
    'lastname': ['', [Validators.required]],
    'address': ['', [Validators.required]],
    'city': ['', [Validators.required]],
    'state': ['', [Validators.required]],
    'phone': ['', [Validators.required]],
    'mobilephone': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchingPasswords })
  states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const pass1 = group.controls['password1'].value;
      const pass2 = group.controls['password2'].value;
      if (pass1 == pass2)
        return null
    }
    return { matching: false }
  }


  onSubmit() {
    let u: User = { ...this.formRegister.value, password: this.formRegister.value.password1 }
    this.authService.register(u)
      .subscribe(
        (u) => {
          this.snackBar.open(
            'Successfuly registered.Use your credentials to log in',
            'ok', { duration: 2000 }
          )
          this.router.navigateByUrl('/auth/login');
        },
        (err) => {
          console.error(err);
          this.snackBar.open(
            err.error.message,
            'ok', { duration: 2000 }
          )
        }
      )
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SideNavComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
profileForm:any;

constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

ngOnInit(): void {
  this.profileForm = this.fb.group({
    nome: ['', Validators.required],
    idade: ['', [Validators.required, Validators.min(18)]],
    nascimento: ['', Validators.required],
    gênero: ['', Validators.required],
    cargo: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    endereço: ['', Validators.required],
    contato: ['', Validators.required]
  });
}

onSubmit() {
  if (this.profileForm.valid) {
    console.log("Salvo!",this.profileForm.value);
  } else {
    this.openSnackBar('Por favor preencha o seu perfil corretamente!', 'Close');
  }
}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000
  });
}

}

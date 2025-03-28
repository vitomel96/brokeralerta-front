import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../infraestructure/driven-adapter/services/auth/auth.service';
import { UserGateway } from '../../../domain/models/User/gateway/user-gateway';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('modalBackdrop') modalBackdrop!: ElementRef; // Para cerrar al hacer clic afuera

  constructor(private authService: AuthService, private userGateway: UserGateway) {}

  isRegister = false;
  isModalOpen = false; // Estado del modal

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  open() {
    this.isModalOpen = true;
  }

  close() {
    this.closeEvent.emit();
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password }).subscribe((response) => {
        if (response.token) {
          this.close();
        } else {
          alert('Credenciales incorrectas');
        }
      });
    }
  }

  submitRegister() {
    if (this.registerForm.invalid) return;
    const name = this.registerForm.value.name!;
    const lastName = this.registerForm.value.lastName!;
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
    const confirmPassword = this.registerForm.value.confirmPassword!;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.userGateway.createUser({ name, email, password, lastName }).subscribe((response) => {
      if (response.id) {
        this.close();
      } else {
        alert('Error al registrar el usuario');
      }
    });
  }

  closeOnBackdropClick(event: Event) {
    if (event.target === this.modalBackdrop.nativeElement) {
      this.close();
    }
  }
}


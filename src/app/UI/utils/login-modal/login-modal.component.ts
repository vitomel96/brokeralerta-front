import { Component, EventEmitter, Output, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../infraestructure/driven-adapter/services/auth/auth.service';
import { UserGateway } from '../../../domain/models/User/gateway/user-gateway';
import Swal from 'sweetalert2';
import { LoginModalService } from '../../../infraestructure/driven-adapter/services/login-modal/login-modal.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('modalBackdrop') modalBackdrop!: ElementRef;

  constructor(
    private authService: AuthService,
    private userGateway: UserGateway,
    public loginModalService: LoginModalService
  ) {}

  isRegister = false;
  isModalOpen = false;

  ngOnInit(): void {
    this.loginModalService.isOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });
  }

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
    this.isModalOpen = false;
    this.closeEvent.emit();
  }

  toggleForm() {
    this.isRegister = !this.isRegister;
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login({ email, password });
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
        Swal.fire({ title: "", icon: "success", confirmButtonText: 'Continuar' }).then(() => {
          this.authService.login({ email: response.email, password: response.password });
        });
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

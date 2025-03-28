import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginModalComponent } from '../../../utils/login-modal/login-modal.component';
import { AuthService } from '../../../../infraestructure/driven-adapter/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginModalComponent, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;
  isAuthenticated: boolean = false;
  user: any = null; // Puede ser un objeto con más datos del usuario
  showModal: boolean = false; // 👈 Asegurar que el modal está renderizado

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => { // 👈 Esperar a que el modal esté en el DOM
      this.cdr.detectChanges();
      console.log('✅ HeaderComponent: ViewChild loginModal inicializado', this.loginModal);
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
    console.log('🟢 Estado de autenticación:', this.isAuthenticated, 'Usuario:', this.user);
  }

  openLogin() {
    this.showModal = true;
  }
  closeLogin() {
    this.showModal = false;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.user = null;
  }
}

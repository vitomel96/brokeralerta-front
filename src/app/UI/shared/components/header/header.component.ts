import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoginModalComponent } from '../../../utils/login-modal/login-modal.component';
import { AuthService } from '../../../../infraestructure/driven-adapter/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { environment } from '../../../../../environments/environment';

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
  adminId = environment.roleId;
  user: any = null;
  showModal: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
    console.log(this.user)
    if(this.user !== null){
    console.log('🟢 Estado de autenticación:', this.isAuthenticated, 'Usuario:', this.user);
  }
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

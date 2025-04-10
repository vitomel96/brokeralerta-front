// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './infraestructure/driven-adapter/services/auth/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser(); // tu método para obtener el usuario autenticado

    if (user && user.roleId === environment.roleId) {
      return true;
    } else {
      this.router.navigate(['/']); // o redirige a una página de login o acceso denegado
      return false;
    }
  }
}

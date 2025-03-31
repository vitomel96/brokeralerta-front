import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../domain/models/User/user';
import { GenericService } from '../../../helpers/generic.service';
import { environment } from '../../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = environment.backendURL;
  private _user: User | null = null;

  constructor(
    private genericService: GenericService,
    private router: Router
  ) {}


  isAuthenticated(): boolean {
    const token = localStorage.getItem('BrokerAlertaToken');

    if (!token) return false;

    try {
      return !this.isTokenExpired(token);
    } catch (error) {
      console.error('Error verificando la autenticación:', error);
      return false;
    }
  }



  getUser(): User | null {
    const userData = localStorage.getItem('BrokerAlertaUser');
    return userData ? JSON.parse(userData) : null;
  }


  login(user: { email: string; password: string }) {
    return this.genericService.post<any>(this._url, 'users/login', user)
      .subscribe({
        next: (response) => {
          localStorage.setItem('BrokerAlertaToken', response.token);
          localStorage.setItem('BrokerAlertaUser', JSON.stringify(response.user));
          this._user = response.user;

          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: `Hola ${response.user.name}, has iniciado sesión correctamente.`,
            timer: 2000,
            showConfirmButton: true,
          }).then(() =>{
            window.location.reload();
          });

        },
        error: (error) => {
          console.error('Login failed:', error);

          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }

  logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se cerrará tu sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('BrokerAlertaToken');
        localStorage.removeItem('BrokerAlertaUser');
        this._user = null;

        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          timer: 1500,
          showConfirmButton: false
        });

        this.router.navigate(['/login']);
      }
    });
  }

  private decodeToken(token: string): User | null {
    try {
      return jwtDecode<User>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  }
}

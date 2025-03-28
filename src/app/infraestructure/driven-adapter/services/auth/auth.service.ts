import { Injectable } from '@angular/core';
import { User } from '../../../../domain/models/User/user';
import { GenericService } from '../../../helpers/generic.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = environment.backendURL;
  user: User | null = null;

  constructor( private genericService: GenericService){
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser() {
    return this.isAuthenticated() ? this.user : null;
  }

   login(user: {email: string, password: string}){
    return this.genericService.post<any>(this._url, 'users/login', user);
  }

  logout() {
    localStorage.removeItem('token');
  }
}

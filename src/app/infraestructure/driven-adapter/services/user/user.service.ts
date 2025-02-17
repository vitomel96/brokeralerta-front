import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GenericService } from '../../../helpers/generic.service';
import { UserGateway } from '../../../../domain/models/User/gateway/user-gateway';
import { User } from '../../../../domain/models/User/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends UserGateway {
  private _url = environment.backendURL;

  constructor(private genericService: GenericService) {
    super();
  }
  getAllUsers(): Observable<User[]> {
    return this.genericService.get<User>(this._url, "users");
  }

  getUserById(userId: string): Observable<User> {
    return this.genericService.get<User>(this._url, `users/${userId}`);
  }
}

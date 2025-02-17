import { Injectable } from "@angular/core";
import { UserGateway } from "../models/User/gateway/user-gateway";
import { Observable } from "rxjs";
import { User } from "../models/User/user";

@Injectable({
  providedIn: "root",
})

export class UserUseCases {
  constructor(private _userGateway: UserGateway) {}

  getAllUsers(): Observable<User[]> {
    return this._userGateway.getAllUsers();
  }

  getUserById(userId: string): Observable<User> {
    return this._userGateway.getUserById(userId);
  }

}

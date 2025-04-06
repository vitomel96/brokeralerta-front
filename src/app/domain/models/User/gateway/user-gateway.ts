import { Observable } from "rxjs";
import { User } from "../user";

export abstract class UserGateway {
  abstract getAllUsers(): Observable<User[]>;
  abstract createUser(user: User): Observable<User>;
  abstract deleteUser(id: String): Observable<User>;
  abstract updateUser(user: User, id: String): Observable<User>;
  abstract getUserById(userId: string): Observable<User>;
}

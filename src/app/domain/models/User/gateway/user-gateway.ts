import { Observable } from "rxjs";
import { User } from "../user";

export abstract class UserGateway {
  abstract getAllUsers(): Observable<User[]>
  abstract getUserById(userId: string): Observable<User>;
}

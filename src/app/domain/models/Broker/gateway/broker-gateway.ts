import { Observable } from "rxjs";
import { Broker } from "../broker";

export abstract class BrokerGateway {
  abstract createBroker(broker: Broker): Observable<Broker>
  abstract getAllBrokers(): Observable<Broker[]>
  abstract updateBroker(broker: Broker, id: number): Observable<Broker>
  abstract deleteBroker(id: number): Observable<Broker>
}

import { Observable } from "rxjs";
import { Broker } from "../broker";

export abstract class BrokerGateway {
  abstract getAllBrokers(): Observable<Broker[]>
}

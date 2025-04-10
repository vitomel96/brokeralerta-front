import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GenericService } from '../../../helpers/generic.service';
import { environment } from '../../../../../environments/environment';
import { BrokerGateway } from '../../../../domain/models/Broker/gateway/broker-gateway';
import { Broker } from '../../../../domain/models/Broker/broker';

@Injectable({
  providedIn: 'root'
})
export class BrokerService extends BrokerGateway{

  private _url = environment.backendURL;

  constructor(private genericService: GenericService) {
    super();
  }
  getAllBrokers(boolean: boolean): Observable<Broker[]> {
    return this.genericService.get<Broker>(this._url, `brokers/get/${boolean}`).pipe(
      map((brokers: any[]) => brokers.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score))
    );
  }
  createBroker(broker: Broker): Observable<Broker> {
    return this.genericService.post<Broker>(this._url, "brokers", broker)
  }
  override updateBroker(broker: Broker, id: number): Observable<Broker> {
    return this.genericService.post<Broker>(this._url, `brokers/update/${id}`, broker)
  }
  override deleteBroker(id: number): Observable<Broker> {
    return this.genericService.delete<Broker>(this._url, `brokers/${id}`)
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Broker } from '../../../domain/models/Broker/broker';
import { BrokerGateway } from '../../../domain/models/Broker/gateway/broker-gateway';
import { GenericFormModule } from '../../../infraestructure/helpers/generic-form-module/generic-form.module';
import { CommentBoxComponent } from '../../utils/comment-box/comment-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-broker-detail',
  standalone: true,
  imports: [CommonModule, GenericFormModule, CommentBoxComponent, MatIconModule, MatButtonModule],
  templateUrl: './broker-detail.component.html',
  styleUrl: './broker-detail.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrokerDetailComponent implements OnInit {
  broker?: Broker| any;
  comment: string = '';
  rating: number = 0;
  hasCommented: boolean = false;

  constructor(private route: ActivatedRoute, private brokerGateway: BrokerGateway, private location: Location) {}

  ngOnInit(): void {
    const brokerName = this.route.snapshot.paramMap.get('name');
    if (brokerName) {
      this.brokerGateway.getAllBrokers().subscribe(brokers => {
        this.broker = brokers.find(b => b.localShortName === brokerName);
        console.log(this.broker)
      });
    }
  }
  goBack(): void {
    this.location.back();
  }
  submitComment() {
    if (!this.hasCommented) {
      console.log(`Comentario enviado: ${this.comment}, Puntuación: ${this.rating}`);
      this.hasCommented = true;
    }
  }
}

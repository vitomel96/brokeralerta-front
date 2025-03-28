import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Broker } from '../../../domain/models/Broker/broker';
import { BrokerGateway } from '../../../domain/models/Broker/gateway/broker-gateway';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './broker-list.component.html',
  styleUrl: './broker-list.component.css'
})
export class BrokerListComponent {
  brokers: Broker[] = [];

  constructor(private brokerGateway: BrokerGateway, private router: Router) {}

  goToBrokerDetail(broker: any) {
    this.router.navigate(['/brokers', broker.localShortName]); // Navega al detalle
  }

  ngOnInit(): void {
    this.brokerGateway.getAllBrokers().subscribe(brokers => {
      this.brokers = brokers.map(broker => {
        // Asigna la bandera a cada etiqueta del broker
        broker.labels = broker.labels.map((label: { labelName: string | string[]; }) => {
          for (const country in this.countryFlags) {
            if (label.labelName.includes(country)) {
              return { ...label, flag: this.countryFlags[country] };
            }
          }
          return label;
        });
        return broker;
      });
    });
  }

  countryFlags: Record<string, string> = {
    "Australia": "https://flagcdn.com/w320/au.png",
    "Japón": "https://flagcdn.com/w320/jp.png",
    "Emiratos Árabes Unidos": "https://flagcdn.com/w320/ae.png",
    "Irlanda": "https://flagcdn.com/w320/ie.png",
    "Sudáfrica": "https://flagcdn.com/w320/za.png",
    "Estados Unidos": "https://flagcdn.com/w320/us.png",
    "España": "https://flagcdn.com/w320/es.png",
    "México": "https://flagcdn.com/w320/mx.png",
    "Argentina": "https://flagcdn.com/w320/ar.png",
    "Brasil": "https://flagcdn.com/w320/br.png",
    "Canadá": "https://flagcdn.com/w320/ca.png",
    "Francia": "https://flagcdn.com/w320/fr.png",
    "Alemania": "https://flagcdn.com/w320/de.png",
        "Seychelles": "https://flagcdn.com/w320/sc.png",
         "Vanuatu": "https://flagcdn.com/w320/vu.png",
         "Chipre": "https://flagcdn.com/w320/cy.png",
         "Mauricio": "https://flagcdn.com/w320/mu.png",
          "Nueva Zelanda": "https://flagcdn.com/w320/nz.png"
  };
  generateFlag(countryName: string): string{
    return this.countryFlags[countryName]
  }

   addFlagsToLabels(labels: { labelName: string }[]) {
    return labels.map(label => {
      for (const country in this.countryFlags) {
        if (label.labelName.includes(country)) {
          return { ...label, flag: this.countryFlags[country] };
        }
      }
      return label;
    });
  }

}

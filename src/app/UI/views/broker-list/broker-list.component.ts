import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Broker } from '../../../domain/models/Broker/broker';
import { BrokerGateway } from '../../../domain/models/Broker/gateway/broker-gateway';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericFormModule } from '../../../infraestructure/helpers/generic-form-module/generic-form.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-broker-list',
  standalone: true,
  imports: [CommonModule,GenericFormModule, MatSlideToggleModule ],
  templateUrl: './broker-list.component.html',
  styleUrl: './broker-list.component.css'
})
export class BrokerListComponent {
  brokers: Broker[] = [];
  searchTerm: string = '';
  selectedCountry: string = '';
  countryList: string[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  isScam: Boolean = false;

  constructor(private route: ActivatedRoute,private brokerGateway: BrokerGateway, private router: Router) {}

  goToBrokerDetail(broker: any) {
    this.router.navigate(['/brokers', broker.localShortName], {
      queryParams: { scam: broker.scam }
    });
  }


  get filteredBrokers(): Broker[] {
    return this.brokers.filter(broker => {
      const matchSearch = this.searchTerm
        ? broker.localShortName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchCountry = this.selectedCountry
        ? broker.registerCountry === this.selectedCountry
        : true;

      return matchSearch && matchCountry;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBrokers.length / this.itemsPerPage);
  }

  paginatedBrokers(): Broker[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredBrokers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  ngOnInit(): void {
    if (this.router.url.includes('/scams')) {
      this.isScam = true;
    } else {
      this.isScam = false;
    }


    this.brokerGateway.getAllBrokers(this.isScam).subscribe(brokers => {
      this.brokers = brokers.map(broker => {
        broker.labels = broker.labels.map((label: { labelName: string | string[] }) => {
          for (const country in this.countryFlags) {
            if (label.labelName.includes(country)) {
              return { ...label, flag: this.countryFlags[country] };
            }
          }
          return label;
        });
        return broker;
      });

      this.countryList = Array.from(new Set(this.brokers.map(b => b.registerCountry))).sort();
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

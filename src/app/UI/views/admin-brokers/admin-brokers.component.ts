import { Component, ViewChild, AfterViewInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Broker } from '../../../domain/models/Broker/broker';
import { BrokerGateway } from '../../../domain/models/Broker/gateway/broker-gateway';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrokerDialogComponent } from '../../utils/broker-dialog/broker-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-brokers',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatSnackBarModule, MatPaginatorModule,
    MatSlideToggleModule
  ],
  templateUrl: './admin-brokers.component.html',
  styleUrl: './admin-brokers.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminBrokersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'country', 'score', 'actions'];
  dataSource = new MatTableDataSource<Broker>([]);
  isScam: boolean = false;
  snackBar = inject(MatSnackBar);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private router: Router,private brokerGateway: BrokerGateway, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.router.url.includes('/scams-admin')) {
      this.isScam = true;
    } else {
      this.isScam = false;
    }

    this.loadBrokers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onToggleScams(event: any): void {
    this.isScam = event.checked;
      this.loadBrokers();
  }

  loadBrokers(): void {
    this.brokerGateway.getAllBrokers(this.isScam).subscribe({
      next: (data: Broker[]) => {
        this.dataSource.data = data.sort((a, b) => a.id - b.id);
        this.dataSource.paginator = this.paginator;
      },
      error: () => this.showSnackbar('Error al cargar brokers', 'error')
    });
  }

  showSnackbar(message: string, type: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type
    });
  }

  openDialog(broker?: Broker): void {
    const dialogRef = this.dialog.open(BrokerDialogComponent, {
      width: '800px',
      data: {
        broker: broker ? { ...broker } : null,
        isScam: this.isScam,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        broker ? this.updateBroker(result) : this.createBroker(result);
      }
    });
  }

  createBroker(broker: Broker) {
    this.brokerGateway.createBroker(broker).subscribe({
      next: () => {
        this.showSnackbar('Broker agregado', 'success');
        this.loadBrokers();
      },
      error: () => this.showSnackbar('Error al agregar broker', 'error')
    });
  }

  updateBroker(broker: Broker) {
    this.brokerGateway.updateBroker(broker, broker.id).subscribe({
      next: () => {
        this.showSnackbar('Broker actualizado', 'success');
        this.loadBrokers();
      },
      error: () => this.showSnackbar('Error al actualizar broker', 'error')
    });
  }

  deleteBroker(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este broker?')) {
      this.brokerGateway.deleteBroker(id).subscribe({
        next: () => {
          this.showSnackbar('Broker eliminado', 'success');
          this.loadBrokers();
        },
        error: () => this.showSnackbar('Error al eliminar broker', 'error')
      });
    }
  }
}

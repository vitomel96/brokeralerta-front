import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../domain/models/User/user';
import { UserGateway } from '../../../domain/models/User/gateway/user-gateway';
import { UserDialogComponent } from '../../utils/users-dialog/users-dialog.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatSnackBarModule, MatPaginatorModule
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userGateway: UserGateway, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.userGateway.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.dataSource.data = users;
      },
      error: () => this.showSnackbar('Error al cargar usuarios', 'error')
    });
  }

  showSnackbar(message: string, type: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type
    });
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      data: user ? { ...user } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user ? this.updateUser(result) : this.createUser(result);
      }
    });
  }

  createUser(user: User) {
    this.userGateway.createUser(user).subscribe({
      next: () => {
        this.showSnackbar('Usuario agregado', 'success');
        this.loadUsers();
      },
      error: () => this.showSnackbar('Error al agregar usuario', 'error')
    });
  }

  updateUser(user: User) {
    this.userGateway.updateUser(user, user.id!).subscribe({
      next: () => {
        this.showSnackbar('Usuario actualizado', 'success');
        this.loadUsers();
      },
      error: () => this.showSnackbar('Error al actualizar usuario', 'error')
    });
  }

  deleteUser(id: string | null | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userGateway.deleteUser(id).subscribe({
        next: () => {
          this.showSnackbar('Usuario eliminado', 'success');
          this.loadUsers();
        },
        error: () => this.showSnackbar('Error al eliminar usuario', 'error')
      });
    }
  }
}
